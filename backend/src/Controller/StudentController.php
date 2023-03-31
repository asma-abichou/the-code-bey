<?php

namespace App\Controller;

use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/api/student')]
class StudentController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }
    // Api to subscribe student to course
    #[Route('/subscribe/{courseId}', name: 'subscribe_to_course', methods: ['GET'])]
    public function subscribeToCourse(Request $request, $courseId, CourseRepository $courseRepository): Response
    {

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
    public function getStudentSubscribedCourses(Request $request, UserRepository $userRepository): Response
    {   $currentUser  = $this->getUser();
        // Check if the current user is a student
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized to view subscribed courses!"], 403);
        }
        $filters = $request->query->all(); // get all query parameters as an associative array

        $subscribedCourses = $currentUser->getSubscribedCourses();

        // apply filters
        if (isset($filters['start_date'])) {
            $subscribedCourses = $subscribedCourses->filter(function($course) use ($filters) {
                return $course->getStartDate() == new \DateTime($filters['start_date']);
            });
        }
        if (isset($filters['category'])) {
            $subscribedCourses = $subscribedCourses->filter(function($course) use ($filters) {
                return $course->getCategory() == $filters['category'];
            });
        }

        $subscribedCourses = $currentUser->getSubscribedCourses();

        if (count($subscribedCourses) === 0) {
            return $this->json(["message" => "You have not subscribed to any courses yet!"], 404);
        }
        return $this->json($subscribedCourses, 200, [], ['groups' => ['main']]);
    }

    #[Route('/profile', name: 'api_student_profile', methods: ['GET'])]
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

        $userArray["user"] = ["firstName" => $user->getFirstName(), "lastName" => $user->getLastName(), "email" => $user->getEmail(), "dateOfBirth" => $user->getDateOfBirth()];
        $response = array_merge($userArray, $allCourses);
        return $this->json($response, 200);

    }


    #[Route('/profile/edit/{id}', name: 'profile_edit', methods: ['PUT'])]
    public function profileEdit(Request $request, $id, UserRepository $userRepository): Response
    {
        $currentUser = $this->getUser();

        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized !"], 403);
        }
        $user = $userRepository->find($id);
        $content = json_decode($request->getContent(), true);
        $user->setEmail($content["email"]);
        $user->setPassword($content["password"]);
        $user->setFirstName($content["firstName"]);
        $user->setLastName($content["lastName"]);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json(["message" => $user->getUserIdentifier(). " user edit  successfully!"], 201);
    }



    #[Route('/image/{idStudent}/upload', name: 'user_image_upload', methods: ['POST'])]
    public function userImageUpload(Request $request, $id, userRepository $userRepository): Response
    {
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->json(["message" => "There is no student with that ID"]);
        }


        /* @var UploadedFile $imageFile */
        $imageFile = $request->files->get('myPicture');
        //1- Verify file extension , it must be .mp4

        if ($imageFile->getClientOriginalExtension() !== 'jpg') {
            return $this->json(["message" => "Invalid file format. Please upload a .jpg file."], 400);
        }
        $imageFileName = md5(uniqid()) . $imageFile->getClientOriginalName();
        $imageFileName = str_replace(" ","",$imageFileName);
        $imagePath = "/public/uploaded-pictures/";

        $fullPath = $this->getParameter('kernel.project_dir') . $imagePath;

        $imageFile->move($fullPath, $imageFileName);
        $user->setPicture("/uploaded-videos/" . $imageFileName);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        //2- Create a new property in Course entity "video" , then save every video link in the associated course
        return $this->json(["message" => $imageFile->getClientOriginalName() . " image uploaded successfully!"], 201);
    }

}
