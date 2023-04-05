<?php

namespace App\Controller;

use App\Entity\Course;
use App\Repository\CategoryRepository;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use JamesHeinrich\GetID3\GetID3;
use JamesHeinrich\GetID3\Module\Tag\ID3v2;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use DateTimeImmutable;


#[Route('/api/course')]
class CourseController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    #[Route('', name: 'list_course', methods: ['GET'])]
    public function index(CourseRepository $courseRepository): Response
    {
        return $this->json($courseRepository->findAll(), 200, [], ['groups' => ['main']]);
    }

    // Api to add a course
    #[Route('/{categoryId}', name: 'add_course', methods: ['POST'])]
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
        $title = $content["title"];
        $description = $content["description"];
        /* @var UploadedFile $videoFile */
        $videoFile = $request->files->get('myvideo');

        //
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
    public function getCourseById(CourseRepository $courseRepository, $id): Response
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
    public function deleteCourse(CourseRepository $courseRepository, $id): Response
    {
        $course = $courseRepository->find($id);
        if(!$this->isGranted("ROLE_TEACHER"))
        {
            return $this->json(["message" => "You are not a teacher and you are not authorized to add a course!"], 403);
        }

        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        $this->entityManager->remove($course);
        $this->entityManager->flush();
        return new Response('The course with ID '.$id.' has been deleted');
    }

    #[Route('/{id}/update', name: 'update_course', methods: ['POST'])]
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
        $videoFile = $request->files->get('myvideo');
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

    // Search filter
    #[Route('/search/filter', name: 'course_search_filter', methods: ['POST'])]
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
        if ($videoFile->getClientOriginalExtension() !== 'mp4') {
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
