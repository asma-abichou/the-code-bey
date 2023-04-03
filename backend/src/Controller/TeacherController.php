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
#[Route('/api/teacher')]
class TeacherController extends AbstractController
{

    public function __construct(private EntityManagerInterface $entityManager)
    {
    }
    // create an api to get the teacher created courses
    #[Route('/created-courses', name: 'get_courses', methods: ['GET'])]
    public function getTeacherCreatedCourses(Request $request, CourseRepository $courseRepository): Response
    {
        $currentUser = $this->getUser();
        if (!$this->isGranted('ROLE_TEACHER')) {
            return $this->json(["message" => "You are not authorized to view created courses!"], 403);
        }
        $courseCreated = $currentUser->getCreatedCourses();
        return $this->json($courseCreated, 200, [], ['groups' => ['main']]);
    }



    #[Route('/profile', name: 'api_teacher_profile', methods: ['GET'])]
    public function teacherProfile(Request $request, UserRepository $userRepository ): Response
    {
        $currentUser  = $this->getUser();
        if(!$this->isGranted("ROLE_TEACHER"))
        {
            return $this->json(["message" => "You are not a teacher and you are not authorized !"], 403);
        }
        $teacher = $userRepository->find($currentUser);

        $subscribedCourses = $teacher->getcreatedCourses();

        $allCourses = [];
        foreach ($subscribedCourses as $course)
        {
            $courseArr = ["title" => $course->getTitle(), "description" => $course->getDescription(), "duration" => $course->getDuration(), "video" => $course->getVideo()];
            $allCourses["courses"][] = $courseArr;
        }

        $userArray["teacher"] = ["firstName" => $teacher->getFirstName(), "lastName" => $teacher->getLastName(), "email" => $teacher->getEmail(), "dateOfBirth" => $teacher->getDateOfBirth()];
        $response = array_merge($userArray, $allCourses);
        return $this->json($response, 200);

    }


    #[Route('/profile/edit', name: 'teacher_profile_edit', methods: ['POST'])]
    public function profileEdit(Request $request, UserRepository $userRepository): Response
    {
        $currentUser  = $this->getUser();
        $currentUserId = $currentUser->getId();

        if(!$this->isGranted("ROLE_TEACHER"))
        {
            return $this->json(["message" => "You are not a teacher and you are not authorized !"], 403);
        }
        $user = $userRepository->find($currentUserId);
        $content = $request->request->all();
        $user->setFirstName($content["firstName"]);
        $user->setLastName($content["lastName"]);

        $profilePictureFile = $request->files->get('profilePicture');
        if ($profilePictureFile) {
            // Generate random name for the picture
            $pictureFileName = md5(uniqid()) . $profilePictureFile->getClientOriginalName();
            // Remove spaces from the picture file name
            $pictureFileName = str_replace(" ","", $pictureFileName);
            $picturePath = "/public/uploaded-pictures/";
            // get full path where to upload the picture
            $fullPath = $this->getParameter('kernel.project_dir') . $picturePath;
            // uploading the picture to the folder
            $profilePictureFile->move($fullPath, $pictureFileName);
            // Saving picture path in the database
            $user->setPicture("/uploaded-pictures/" . $pictureFileName);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        // We use groups edit-profile to specify the properties to return
        return $this->json($user, 200, [], ['groups' => ['edit-profile']]);
    }



}
