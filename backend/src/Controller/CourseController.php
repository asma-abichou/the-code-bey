<?php

namespace App\Controller;

use App\Entity\Course;
use App\Repository\CategoryRepository;
use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use JamesHeinrich\GetID3\GetID3;
use JamesHeinrich\GetID3\Module\Tag\ID3v2;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use DateTimeImmutable;
use OpenApi\Attributes as OA;

#[Route('/api/course')]
class CourseController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    #[Route('', name: 'list_course', methods: ['GET'])]
    #[OA\Get(description: 'get the list of all courses')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of courses',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Course::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'Course')]
    public function index(CourseRepository $courseRepository): Response
    {
        return $this->json($courseRepository->findAll(), 200, [], ['groups' => ['main']]);
    }

    // Api to get courses based on category ID
    #[Route('/category/{categoryId}', name: 'list_courses_by_category', methods: ['GET'])]
    #[OA\Get(description: 'get the list of courses related to a specific category')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of courses related to a specific category',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Course::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'Course')]
    public function listOfCoursesByCategory( CategoryRepository $categoryRepository, $categoryId): Response
    {
        $category = $categoryRepository->find($categoryId);
        if(!$category)
        {
            return $this->json(["message" => "There is not a category with that ID!"], 404);
        }
        return $this->json($category->getCourses(), 200, [], ['groups' => ['main']]);
    }

    // Api to add a course
    #[Route('/{categoryId}', name: 'add_course', methods: ['POST'])]
    #[OA\Post(description: 'Creates a new course')]
    #[OA\RequestBody(
        description: 'Creates new course',
        content: [new OA\MediaType(mediaType: "multipart/form-data" , schema: new OA\Schema(
            properties: [
                new OA\Property(property: 'title', type:'string'),
                new OA\Property(property: 'description', type:'string'),
                new OA\Property(property: 'duration', type:'string'),
                new OA\Property(property: "myVideo", type: 'file', format:"binary")
            ],
            example: ['title' => 'Fullstack development',
                      'description' => 'this is a fullstack development course',
                      'duration' => '2 hours',
                      'video' => '']
        ))]
    )]

    #[OA\Response(
    response: 201,
    description: 'Returns the created course',
    content: new OA\JsonContent(
    type: 'array',
    items: new OA\Items(ref: new Model(type: Course::class, groups: ['main']))
    )
    )]

    #[OA\Tag(name:'Course')]
    public function addCourse(Request $request, $categoryId, CategoryRepository $categoryRepository): Response
    {
        if(!$this->isGranted("ROLE_TEACHER"))
        {
            return $this->json(["message" => "You are not a teacher and you are not authorized to add a course!"], 403);
        }
        // get authenticated User
        $currentUser = $this->getUser();
        // Get content
        $content = $request->request->all();
        // get the category object by category id
        $category = $categoryRepository->find($categoryId);
        $title = $content["title"]; //error
        $description = $content["description"];
        /* @var UploadedFile $videoFile */

        $videoFile = $request->files->get('myVideo');


        $uploadedVideo = $this->videoUpload($videoFile);
        $newCourse = new Course();
        // link course to the authenticated user
        $newCourse->setTeacher($currentUser);
        // link course to the category
        $newCourse->setCategory($category);
        $newCourse->setTitle($title);
        $newCourse->setDescription($description);
        $newCourse->setVideo($uploadedVideo["path"]);
        $newCourse->setDuration($uploadedVideo["duration"]);
        $newCourse->setCreatedAt(new DateTimeImmutable());
        $newCourse->setUpdatedAt(new DateTimeImmutable());
        $this->entityManager->persist($newCourse);
        $this->entityManager->flush();
        return $this->json($newCourse, 201, [], ['groups' => ['main']]);
    }

    // Get course by id
    #[Route('/{id}', name: 'get_course_by_id', methods: ['GET'])]
    #[OA\Get(description: 'get a course')]
    #[OA\Response(
        response: 200,
        description: 'Returns a course by Id',
        content: new Model(type: Course::class, groups: ['main'])
    )]
    #[OA\Tag(name:'Course')]
    public function getCourseById(CourseRepository $courseRepository, $id ): Response
    {
        $course = $courseRepository->find($id);
        if($course)
        {
            return $this->json($course, 200, [], ['groups' => ['main']]);
        } else {
            return $this->json(["message" => "There is no course with that ID"]);
        }


    }

    #[Route('/{id}', name: 'delete_course', methods: ['DELETE'])]
    #[OA\Delete(description: 'Deletes a course')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted category',
        content: new Model(type: Course::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'Course')]
    public function deleteCourse(CourseRepository $courseRepository, $id): Response
    {
        $course = $courseRepository->find($id);
        if(!$this->isGranted("ROLE_TEACHER"))
        {
            return $this->json(["message" => "You are not a teacher and you are not authorized to delete a course!"], 403);
        }

        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        $this->entityManager->remove($course);
        $this->entityManager->flush();
        return new Response('The course with ID '.$id.' has been deleted');
    }

    #[Route('/{id}/update', name: 'update_course', methods: ['POST'])]
    #[OA\Post(description: 'Update a course')]
    #[OA\RequestBody(
        description: 'Update a course by Id',
        content: [new OA\MediaType(mediaType: "multipart/form-data" , schema: new OA\Schema(
            properties: [
                new OA\Property(property: "myVideo", type: "file", format:"binary"),
                new OA\Property(property: 'title', type:'string'),
                new OA\Property(property: 'description', type:'string'),
                new OA\Property(property: 'duration', type:'string')
            ],
            example: ['title' => 'Fullstack development',
                      'description' => 'this is a fullstack development course',
                      'duration' => '2 hours',
                      'video' => '']
        ))]
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated course',
        content: new Model(type: Course::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'Course')]
    public function updateCourse(CourseRepository $courseRepository, $id, Request $request): Response
    {
        if (!$this->isGranted("ROLE_TEACHER"))
        {
            return $this->json(["message" => "You are not authorized to update this course"], 403);
        }
        $course = $courseRepository->find($id);
        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        // Get the request content as an array
        $content = $request->request->all();
        /* @var UploadedFile $videoFile */

        $videoFile = $request->files->get('myVideo');

        if($videoFile)
        {
            $uploadedVideo = $this->videoUpload($videoFile);
        }
        if(isset($content["title"])) $course->setTitle($content["title"]);
        if(isset($content["description"])) $course->setDescription($content["description"]);
        $course->setUpdatedAt(new DateTimeImmutable());
        if($videoFile)
        {
            $course->setVideo($uploadedVideo["path"]);
            $course->setDuration($uploadedVideo["duration"]);
        }
        $this->entityManager->persist($course);
        $this->entityManager->flush();
        return $this->json($course, 200, [], ['groups' => ['main']]);
    }

    // find courses by  search filter
    #[Route('/search/filter', name: 'course_search_filter', methods: ['POST'])]
    #[OA\Post(description: 'find Courses By Search Filter')]
    #[OA\RequestBody(
        description: 'filter course ',
        content: new OA\JsonContent(
                properties: [
                new OA\Property(property: 'title', type:'string'),
                new OA\Property(property: 'description', type:'string'),
                new OA\Property(property: 'duration', type:'string')
            ],
            example: ['title' => 'Fullstack development',
                     /* 'description' => 'this is a fullstack development course',
                      'duration' => '2 hours'*/
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the Courses By Search Filter',
        content: new Model(type: Course::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'Course')]
    public function searchFilter(CourseRepository $courseRepository, Request $request): Response
    {
        $criterias = json_decode($request->getContent(), true);
        if(isset($criterias["createdAt"]))
        {
            $criterias["createdAt"] = new DateTimeImmutable($criterias["createdAt"] );
        }

        $courses = $courseRepository->findCoursesBySearchFilter($criterias);

        return $this->json($courses, 200, [], ['groups' => ['main']]);
    }



    private function videoUpload($videoFile): array|JsonResponse
    {
        //1- Verify file extension , it must be .mp4
        if ($videoFile && $videoFile->getClientOriginalExtension() !== 'mp4') {
            return $this->json(["message" => "Invalid file format. Please upload a .mp4 file."], 400);
        }
        // generate random file name
        $videoFileName = md5(uniqid()) . $videoFile->getClientOriginalName();
        // Remove spaces from video file name
        $videoFileName = str_replace(" ","",$videoFileName);
        $videoPath = "/public/uploaded-videos/";
        // Get video full path
        $fullPath = $this->getParameter('kernel.project_dir') . $videoPath;
        // Upload video
        $videoFile->move($fullPath, $videoFileName);

        // Get video duration
        $getID3 = new GetID3();
        $videoFileInfos = $getID3->analyze($fullPath . $videoFileName);
        $duration = $videoFileInfos["playtime_string"];
        return [
            "path" => "/uploaded-videos/" . $videoFileName,
            "duration" => $duration
        ];
    }

}
