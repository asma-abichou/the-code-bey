<?php

namespace App\Controller;

use App\Repository\CourseRepository;
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
    // Api to add a course
    #[Route('/subscribe/{courseId}', name: 'subscribe_to_course', methods: ['GET'])]
    public function subscribeToCourse(Request $request, $courseId, CourseRepository $courseRepository): Response
    {
        // Get request Body and decode it from JSON to array
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
}
