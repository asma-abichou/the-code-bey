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
    #[Route('/created-courses', name: 'get_created_courses', methods: ['GET'])]
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
        $user = $userRepository->find($currentUser);

        $user = $user->getCreatedCourses();

        return $this->json($user, 200, [], ['groups' => ['main']]);

    }


    #[Route('/profile/edit/{teacherId}', name: 'teacher_profile_edit', methods: ['PUT'])]
    public function profileEdit(Request $request, $teacherId, UserRepository $userRepository): Response
    {
        $currentUser  = $this->getUser();

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



    #[Route('/image/{idTeacher}/upload', name: 'teacher_image_upload', methods: ['POST'])]
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
