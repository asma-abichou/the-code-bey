<?php

namespace App\Controller;

use App\Entity\Course;
use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

#[Route('/api/admin')]
class AdminController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    /*#[Route('', name: 'list_student', methods: ['GET'])]
    #[OA\Get(description: 'get the list of all students')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of students',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Course::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function index(UserRepository $userRepository): Response
    {
        return $this->json($userRepository->findAll(), 200, [], ['groups' => ['main']]);
    }*/
    #[Route('/index', name: 'index_admin', methods: ['GET'])]
    public function index(UserRepository $userRepository, CourseRepository $courseRepository): Response
    {
        $studentsCount = count($userRepository->fetchUsersByRole("ROLE_STUDENT"));
        $teachersCount = count($userRepository->fetchUsersByRole("ROLE_TEACHER"));
        $coursesCount = count($courseRepository->findAll());

        return $this->json([
            "studentsCount" => $studentsCount,
            "teachersCount" => $teachersCount,
            "coursesCount" => $coursesCount,
        ], 200);
    }

    // Admin show list of all students
    #[Route('/students/list', name: 'admin_students_list', methods: ['GET'])]
    public function adminStudentsList(UserRepository $userRepository): Response
    {
        $students = $userRepository->fetchUsersByRole("ROLE_STUDENT");
        return $this->json($students, 200, [], ['groups' => ['students-list']]);
    }

    // Admin show selected student
    #[Route('/students/show/{id}', name: 'admin_student_show', methods: ['GET'])]
    public function adminStudentShow($id, UserRepository $userRepository): Response
    {
        return $this->json($userRepository->find($id), 200, [], ['groups' => ['student-show']]);
    }

}
