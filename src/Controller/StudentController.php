<?php

namespace App\Controller;

use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
        $subscribedCourses  = $currentUser->getSubscribedCourses();
        return $this->json($subscribedCourses , 200, [], ['groups' => ['main']]);

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
}
