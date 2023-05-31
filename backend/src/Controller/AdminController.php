<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

#[Route('/api/admin')]
class AdminController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository
    )
    {
    }
    #[Route('/index', name: 'index_admin', methods: ['GET'])]
    #[OA\Get(description: 'Get the number of all users ')]
    #[OA\Response(
        response: 200,
        description: 'Returns the sum of all user',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    //count users
    public function index(CourseRepository $courseRepository): Response
    {
        $studentsCount = count($this->userRepository->fetchUsersByRole("ROLE_STUDENT"));
        $teachersCount = count($this->userRepository->fetchUsersByRole("ROLE_TEACHER"));
        $coursesCount = count($courseRepository->findAll());

        return $this->json([
            "studentsCount" => $studentsCount,
            "teachersCount" => $teachersCount,
            "coursesCount" => $coursesCount,
        ], 200);
    }

    // STUDENTS

    // Admin show list of all students
    #[Route('/students/list', name: 'admin_students_list', methods: ['GET'])]
    #[OA\Get(description: 'Get the list of all students ')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of all students',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function adminStudentsList(): Response
    {
        $students = $this->userRepository->fetchUsersByRole("ROLE_STUDENT");
        return $this->json($students, 200, [], ['groups' => ['students-list']]);
    }

    // Admin show selected student
    #[Route('/students/show/{id}', name: 'admin_student_show', methods: ['GET'])]
    #[OA\Get(description: 'Get more details about student selected  ')]
    #[OA\Response(
        response: 200,
        description: 'Returns details student',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function adminStudentShow($id,): Response
    {
        return $this->json($this->userRepository->find($id), 200, [], ['groups' => ['student-show']]);
    }

    // Admin  update a  student
    #[Route('/students/edit/{id}', name: 'admin_student_update', methods: ['PUT'])]
    #[OA\Put(description: 'Update a student')]
    #[OA\RequestBody(
        description: 'Update a student by Id',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'firstName', type:'string'),
                new OA\Property(property: 'lastName', type:'string'),
                new OA\Property(property: 'username', type:'string'),
            ],
            example: ['firstName' => 'asma',
                'lastName' =>'ab',
                'username'=>'ab123']
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated student',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminUpdateStudent($id , Request $request): Response
    {
        $student = $this->userRepository->find($id);
        if (!$student) {
            return $this->json(["message" => "There is no student with that ID"]);
        }
        return $this->adminUpdateUser($student, $request);

    }

    // Admin delete a student
    #[Route('/students/delete/{id}', name: 'admin_students_delete', methods: ['DELETE'])]
    #[OA\Delete(description: 'Deletes a student')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted student',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminDeleteStudent($id): JsonResponse
    {
        $student = $this->userRepository->find($id);
        if (!$student) {
            return $this->json(["message" => "There is no student with that ID"]);
        }
        return $this->adminDeleteUser($student);
    }




    // TEACHERS

    // admin show list of all teacher
    #[Route('/teachers/list', name: 'admin_teachers_list', methods: ['GET'])]
    #[OA\Get(description: 'Get the list of all teachers')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of all teachers',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function adminTeacherList(): Response
    {
        $teachers = $this->userRepository->fetchUsersByRole("ROLE_TEACHER");
        return $this->json($teachers, 200, [], ['groups' => ['teacher-list']]);
    }

    // Admin show selected teacher
    #[Route('/teacher/show/{id}', name: 'admin_teacher_show', methods: ['GET'])]
    #[OA\Get(description: 'Get more details about teacher selected  ')]
    #[OA\Response(
        response: 200,
        description: 'Returns details teacher',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function adminTeacherShow($id): Response
    {
        return $this->json($this->userRepository->find($id), 200, [], ['groups' => ['student-show']]);
    }

    // Admin  update a  teacher
    #[Route('/teachers/edit/{id}', name: 'admin_teacher_update', methods: ['PUT'])]
    #[OA\Put(description: 'Update a teacher')]
    #[OA\RequestBody(
        description: 'Update a teacher by Id',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'firstName', type:'string'),
                new OA\Property(property: 'lastName', type:'string'),
                new OA\Property(property: 'username', type:'string'),
            ],
            example: ['firstName' => 'asma',
            'lastName' =>'ab',
            'username' =>'ab']
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated teacher',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminUpdateTeacher($id, Request $request): JsonResponse
    {
        $teacher = $this->userRepository->find($id);
        if (!$teacher) {
            return $this->json(["message" => "There is no teacher with that ID"]);
        }
        return $this->adminUpdateUser($teacher, $request);
    }

    public function adminUpdateUser(User $user, Request $request): JsonResponse
    {
        // Get the request content as an array

       $content = json_decode($request->getContent(), true);
        $user->setfirstName($content["firstName"]);
        $user->setLastName($content["lastName"]);
        $user->setLastName($content["username"]);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json($user, 200, [], ['groups' => 'edit-profile']);
    }

    // Admin delete teacher
    #[Route('/teachers/delete/{id}', name: 'admin_teacher_delete', methods: ['DELETE'])]
    #[OA\Delete(description: 'Deletes a teacher')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted teacher',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminDeleteTeacher($id): JsonResponse
    {
        $teacher = $this->userRepository->find($id);
        if (!$teacher) {
            return $this->json(["message" => "There is no teacher with that ID"]);
        }
       return $this->adminDeleteUser($teacher);
   }

    public function adminDeleteUser(User $user): JsonResponse
    {
        // Mark user as deleted
        $user->setIsDeleted(true);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json(["message" => "User successfully deleted!"]);
    }

}
