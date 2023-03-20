<?php

namespace App\Controller;

use App\Entity\Course;
use App\Repository\CategoryRepository;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class CourseController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    #[Route('/course', name: 'list_course', methods: ['GET'])]
    public function index(CourseRepository $courseRepository): Response
    {
        return $this->json($courseRepository->findAll(), 200, [], ['groups' => ['main']]);
    }

    // Api to add a course
    #[Route('/course/{categoryId}', name: 'add_course', methods: ['POST'])]
    public function addCourse(Request $request, $categoryId, CategoryRepository $categoryRepository): Response
    {
        // Get request Body and decode it from JSON to array
        $content = json_decode($request->getContent(), true);
        // get the category object by category id
        $category = $categoryRepository->find($categoryId);

        $title = $content["title"];
        $description = $content["description"];
        // get authenticated User
        $currentUser = $this->getUser();
        $newCourse = new Course();
        $newCourse->setTitle($title);
        $newCourse->setDescription($description);
        // link course to the authenticated user
        $newCourse->addUser($currentUser);
        // link course to the category
        $newCourse->setCategory($category);
        $this->entityManager->persist($newCourse);
        $this->entityManager->flush();
        return $this->json(["message" => "Course has been saved successfully"], 200);
    }

    // Get course by id
    #[Route('/course/{id}', name: 'get_course_by_id', methods: ['GET'])]
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

    #[Route('/course/{id}', name: 'delete_course', methods: ['DELETE'])]
    public function deleteCourse(CourseRepository $courseRepository, $id): Response
    {
        $course = $courseRepository->find($id);
        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        $this->entityManager->remove($course);
        $this->entityManager->flush();
        return new Response('The course with ID '.$id.' has been deleted');
    }

    #[Route('/course/{id}', name: 'update_course', methods: ['PUT'])]
    public function updateCourse(CourseRepository $courseRepository, $id, Request $request): Response
    {
        $course = $courseRepository->find($id);
        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        $content = json_decode($request->getContent(), true);
        $course->setTitle($content["title"]);
        $course->setDescription($content["description"]);
        $this->entityManager->persist($course);
        $this->entityManager->flush();
        return $this->json($course, 200, [], ['groups' => ['main']]);
    }

    #[Route('/courses/{id}/add-student', name: 'course_add_student', methods: ['POST'])]
    public function addStudent(Request $request, Course $course): Response
    {
    }
}
