<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

#[Route('/api/admin')]
class AdminController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
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
    public function adminStudentsList(UserRepository $userRepository): Response
    {
        $students = $userRepository->fetchUsersByRole("ROLE_STUDENT");
        return $this->json($students, 200, [], ['groups' => ['students-list']]);
    }

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
    public function adminTeacherList(UserRepository $userRepository): Response
    {
        $teachers = $userRepository->fetchUsersByRole("ROLE_TEACHER");
        return $this->json($teachers, 200, [], ['groups' => ['teacher-list']]);
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
    public function adminStudentShow($id, UserRepository $userRepository): Response
    {
        return $this->json($userRepository->find($id), 200, [], ['groups' => ['student-show']]);
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
    public function adminTeacherShow($id, UserRepository $userRepository): Response
    {
        return $this->json($userRepository->find($id), 200, [], ['groups' => ['student-show']]);
    }


    // Admin  update a  student
    #[Route('/students/edit/{id}', name: 'admin_students_update', methods: ['PUT'])]
    #[OA\Post(description: ' Edit Student selected ')]
    #[OA\RequestBody(
        description: 'Edit student ',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'firstName', type:'string'),
                new OA\Property(property: 'lastName', type:'string')
            ],
            example: ['fistName' => 'asma',
                      'lastName' => 'abichou'
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated student',
        content: new Model(type: user::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminUpdateStudent(UserRepository $userRepository , $id , Request $request): Response
    {
        $student = $userRepository->find($id);
        if (!$student) {
            return $this->json(["message" => "There is no student with that ID"]);
        }
        // Get the request content as an array
        $content = json_decode($request->getContent(), true);
        $student->setfirstName($content["firstName"]);
        $student->setLastName($content["lastName"]);
        $this->entityManager->persist($student);
        $this->entityManager->flush();
        return $this->json($student, 200, [], ['edit-student']);

    }

     #[Route('/students/delete/{id}', name: 'admin_students_delete', methods: ['DELETE'])]
     #[OA\Delete(description: 'Deletes a student')]
     #[OA\Response(
         response: 200,
         description: 'Returns the deleted student',
         content: new Model(type: User::class, groups: ['main'])
     )]
     #[OA\Tag(name: 'admin')]
     public function adminDeleteStudent(UserRepository $userRepository, $id): Response
     {
         $student = $userRepository->find($id);
         if (!$student) {
             return $this->json(["message" => "There is no student with that ID"]);
         }
         // delete student with the remove function
         $this->entityManager->remove($student);
         $this->entityManager->flush();
         return $this->json($student, 200, [], ['groups' => ['main']]);

     }


    // Admin  update a  teacher
    #[Route('/teachers/edit/{id}', name: 'admin_teacher_update', methods: ['PUT'])]
    #[OA\Post(description: ' Edit teacher selected ')]
    #[OA\RequestBody(
        description: 'Edit teacher ',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'firstName', type:'string'),
                new OA\Property(property: 'lastName', type:'string')
            ],
            example: ['fistName' => 'yessine',
                'lastName' => 'ben hawala'
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated teacher',
        content: new Model(type: user::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminUpdateTeacher(UserRepository $userRepository , $id , Request $request): Response
    {
        $teacher = $userRepository->find($id);
        if (!$teacher) {
            return $this->json(["message" => "There is no teacher with that ID"]);
        }
        // Get the request content as an array
        $content = json_decode($request->getContent(), true);
        $teacher->setfirstName($content["firstName"]);
        $teacher->setLastName($content["lastName"]);
        $this->entityManager->persist($teacher);
        $this->entityManager->flush();
        return $this->json($teacher, 200, [], ['teacher-edit']);

    }


    #[Route('/teachers/delete/{id}', name: 'admin_teacher_delete', methods: ['DELETE'])]
    #[OA\Delete(description: 'Deletes a teacher')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted teacher',
        content: new Model(type: User::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminDeleteTeacher(UserRepository $userRepository, $id): Response
    {
       $teacher = $userRepository->find($id);
       if (!$teacher) {
           return $this->json(["message" => "There is no student with that ID"]);
       }
       // delete teacher with the remove function
       $this->entityManager->remove($teacher);
       $this->entityManager->flush();
       return $this->json($teacher, 200, [], ['teacher-delete']);

   }

}
