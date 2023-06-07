<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

#[Route('/api/student')]
class StudentController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    // Api to subscribe student to course
    #[Route('/subscribe', name: 'subscribe_to_course', methods: ['POST'])]
    #[OA\Post(description: ' create a subscription')]
    #[OA\RequestBody(
        description: 'filter course ',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'id', type:'int')
            ],
               example: ['id' => '3'
            ]
        )
    )]
    #[OA\Response(
        response : 200,
        description: 'Returns the subscribe course',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name:'Student')]
    public function subscribeToCourse(Request $request, CourseRepository $courseRepository): Response
    {
        $currentUser  = $this->getUser();
        // Check if the current user is a student
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized to view subscribed courses!"], 403);
        }
        $content = json_decode($request->getContent(), true);
        $courseId = $content["id"];
        $course = $courseRepository->find($courseId);
        if(!$course)
        {
            return $this->json(["message" => "There is no course with that ID"], 404);
        }
        $currentUser = $this->getUser();
        if($course->getStudent()->contains($currentUser)) {
            return $this->json(["message" => "You have already subscribed to this course"], 400);
        }
        $course->addStudent($currentUser);
        $this->entityManager->persist($course);
        $this->entityManager->flush();
        return $this->json($course, 200, [], ['groups' => ['main']]);
    }



    // create an api to get the student subscribed courses
    #[Route('/subscribed-courses', name: 'get_subscribed_courses', methods: ['GET'])]
    #[OA\Get(description: 'get the list of  course subscribed')]

    #[OA\Response(
        response : 200,
        description: 'Returns list of the subscribe course',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name:'Student')]
    public function getStudentSubscribedCourses(Request $request, UserRepository $userRepository): Response
    {   $currentUser  = $this->getUser();
        // Check if the current user is a student
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized to view subscribed courses!"], 403);
        }
        $filters = $request->query->all(); // get all query parameters as an associative array
         //get the subscribed courses
        $subscribedCourses = $currentUser->getSubscribedCourses();

        if (count($subscribedCourses) === 0) {
            return $this->json(["message" => "You have not subscribed to any courses yet!"], 404);
        }
        return $this->json($subscribedCourses, 200, [], ['groups' => ['main']]);
    }

    #[Route('/profile', name: 'api_student_profile', methods: ['GET'])]
    #[OA\Get(description: ' Student profile')]
    #[OA\Response(
        response: 200,
        description: 'Returns student profile',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'Student')]
    public function studentProfile(Request $request, UserRepository $userRepository ): Response
    {
        $currentUser  = $this->getUser();
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized !"], 403);
        }
        $user = $userRepository->find($currentUser);

        $subscribedCourses = $user->getSubscribedCourses();
        $allCourses = [];
        foreach ($subscribedCourses as $course)
        {
            $courseArr = ["title" => $course->getTitle(), "description" => $course->getDescription(), "duration" => $course->getDuration(), "video" => $course->getVideo()];
            $allCourses["courses"][] = $courseArr;
        }

        $userArray["user"] = ["firstName" => $user->getFirstName(), "lastName" => $user->getLastName(), "email" => $user->getEmail(), "picture" => $user->getPicture()];
        $response = array_merge($userArray, $allCourses);
        return $this->json($response, 200);

    }


    #[Route('/profile/edit', name: 'student_profile_edit', methods: ['POST'])]
    #[OA\Post(description: 'edit student profile')]
    #[OA\RequestBody(
        description: 'edit some information of student profile ',
        content: [new OA\MediaType(mediaType: "multipart/form-data" , schema: new OA\Schema(
            properties: [
                new OA\Property(property: 'firstName', type:'string'),
                new OA\Property(property: 'lastName', type:'string'),
                new OA\Property(property: "picture", type: "file", format:"binary")
            ],
            example: ['firstName' => 'Asma',
                      'lastName' => 'Abichou',
                      'picture' => '',
                ]
        ))]
    )]

    #[OA\Response(
        response : 200,
        description: 'Returns profile edited',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'Student')]
    public function profileEdit(Request $request , UserRepository $userRepository): Response
    {

        $currentUser = $this->getUser();
        $currentUserId = $currentUser->getId();

        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized !"], 403);
        }

        $user = $userRepository->find($currentUserId);

        $content = $request ->request->all();
        $user->setFirstName($content["firstName"]);
        $user->setLastName($content["lastName"]);

         $pictureFile = $request->files->get('picture');

        if ($pictureFile){
            //generate a name  for picture
            $pictureFileName = md5(uniqid ()). $pictureFile->getClientOriginalName();
            //remove space from the name picture
            $pictureFileName = str_replace(" ", "", $pictureFileName);
            $picturePath =  "/public/uploaded-pictures/";
            // get full path where to upload the picture
            $fullPath = $this->getParameter('kernel.project_dir') . $picturePath;
            // uploading the picture to the folder
            $pictureFile->move($fullPath, $pictureFileName);
            // Saving picture path in the database
            $user->setPicture("/uploaded-pictures/" . $pictureFileName);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json($user, 200, [], ['groups' => ['edit-profile']]);

    }



}
