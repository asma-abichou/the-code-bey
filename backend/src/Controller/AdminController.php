<?php

namespace App\Controller;

use App\Entity\Course;
use App\Entity\User;
use App\Repository\CourseRepository;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use JamesHeinrich\GetID3\GetID3;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;
use DateTimeImmutable;

#[Route('/api/admin')]
class AdminController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface  $entityManager,
        private readonly UserRepository $userRepository,
        private readonly CourseRepository $courseRepository,

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

    // Admin show list of all courses
    #[Route('/courses/list', name: 'admin_courses_list', methods: ['GET'])]
    #[OA\Get(description: 'Get the list of all courses ')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of all courses',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function adminCoursesList(): Response
    {
        $courses = $this->courseRepository->findAll();
        return $this->json($courses, 200, [], ['groups' => ['main']]);
    }
    // Admin show selected course
    #[Route('/courses/show/{id}', name: 'admin_course_show', methods: ['GET'])]
    #[OA\Get(description: 'Get more details about course selected  ')]
    #[OA\Response(
        response: 200,
        description: 'Returns details course',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: User::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'admin')]
    public function adminCourseShow($id): Response
    {
        return $this->json($this->courseRepository->find($id), 200, [], ['groups' => ['main']]);
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
        return $this->json($teachers, 200, [], ['groups' => ['main']]);
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
        $user->setUsername($content["username"]);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json($user, 200, [], ['groups' => 'edit-profile']);
    }

    // Admin delete teacher

    #[Route('/teachers/delete/{id}', name: 'teacher_admin_delete', methods: ['DELETE'])]
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





    //COURSES
    // Admin  update a course
    #[Route('/courses/edit/{id}', name: 'admin_course_update', methods: ['POST'])]
    #[OA\Post(description: 'Update a course')]
    #[OA\RequestBody(
        description: 'Update a course by Id',
        content: [new OA\MediaType(mediaType: "multipart/form-data" , schema: new OA\Schema(
            properties: [
                new OA\Property(property: "myVideo", type: "file", format:"binary"),
                new OA\Property(property: 'title', type:'string'),
                new OA\Property(property: 'description', type:'string'),
                new OA\Property(property: 'duration', type:'string')
            ],
            example: ['title' => 'Fullstack development',
                'description' => 'this is a fullstack development course',
                'duration' => '2 hours',
                'video' => '']
        ))]
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated course',
        content: new Model(type: Course::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminUpdateCourse($id, Request $request): Response
    {
        if (!$this->isGranted("ROLE_ADMIN"))
        {
            return $this->json(["message" => "You are not authorized to update this course"], 403);
        }
        $course = $this->courseRepository->find($id);
        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        // Get the request content as an array
        $content = $request->request->all();
        /* @var UploadedFile $videoFile */

        $videoFile = $request->files->get('myVideo');

        if($videoFile)
        {
            $uploadedVideo = $this->videoUpload($videoFile);
        }
        if(isset($content["title"])) $course->setTitle($content["title"]);
        if(isset($content["description"])) $course->setDescription($content["description"]);
        $course->setUpdatedAt(new DateTimeImmutable());
        if($videoFile)
        {
            $course->setVideo($uploadedVideo["path"]);
            $course->setDuration($uploadedVideo["duration"]);
        }
        $this->entityManager->persist($course);
        $this->entityManager->flush();

        return $this->json($course, 200, [], ['groups' => ['main']]);
    }


    // Admin  delete a course
    #[Route('/courses/delete/{id}', name: 'admin_teacher_delete', methods: ['DELETE'])]
    #[OA\Delete(description: 'Deletes a course')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted category',
        content: new Model(type: Course::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'admin')]
    public function adminDeleteCourse($id): Response
    {
        $course = $this->courseRepository->find($id);
        if(!$this->isGranted("ROLE_ADMIN"))
        {
            return $this->json(["message" => "You are not an admin  and you are not authorized to add a course!"], 403);
        }

        if (!$course) {
            return $this->json(["message" => "There is no course with that ID"]);
        }
        $this->entityManager->remove($course);
        $this->entityManager->flush();
        return new Response('The course with ID '.$id.' has been deleted');
    }

    private function videoUpload($videoFile): array|JsonResponse
    {

        if ($videoFile && $videoFile->getClientOriginalExtension() !== 'mp4') {
            return $this->json(["message" => "Invalid file format. Please upload a .mp4 file."], 400);
        }
        // generate random file name
        $videoFileName = md5(uniqid()) . $videoFile->getClientOriginalName();
        // Remove spaces from video file name
        $videoFileName = str_replace(" ","",$videoFileName);
        $videoPath = "/public/uploaded-videos/";
        // Get video full path
        $fullPath = $this->getParameter('kernel.project_dir') . $videoPath;
        // Upload video
        $videoFile->move($fullPath, $videoFileName);

        // Get video duration
        $getID3 = new GetID3();
        $videoFileInfos = $getID3->analyze($fullPath . $videoFileName);
        $duration = $videoFileInfos["playtime_string"];
        return [
            "path" => "/uploaded-videos/" . $videoFileName,
            "duration" => $duration
        ];
    }


}
