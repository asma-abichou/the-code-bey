<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Comment;
use App\Repository\CommentRepository;
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

#[Route('/api/comment')]
class CommentController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly CourseRepository $courseRepository,
    )
    {
    }
    // All comments lists
    #[Route('/list', name: 'comment_list', methods:"GET")]
    #[OA\Get(description: 'Get the list of all comments')]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of all comments',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Comment::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'comment')]
    public function commentsList(CommentRepository $commentRepository): JsonResponse
    {
        return $this->json($commentRepository->findAll(), 200, [], ['groups' => ['main']]);
    }

    #[Route('/new', name: 'new_comment', methods: 'POST')]
    #[OA\Post(description: 'Creates a new comment')]
    #[OA\RequestBody(
        description: 'Creates new comment',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'content', type:'string'),
                new OA\Property(property: 'courseId', type:'string'),
            ],
            example: ['content' => 'thank you for the amazing experience !! ',
                'courseId' => '21']
        )
    )]
    #[OA\Response(
        response: 201,
        description: 'Returns the created comment',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Comment::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'comment')]
    public function newComment(Request $request): JsonResponse
    {
        if (!$this->isGranted("ROLE_STUDENT")) {
            return $this->json(["message" => "You are not a student and you are not authorized to write a comment!"], 403);
        }

        $data = json_decode($request->getContent(), true);
        $course = $this->courseRepository->find($data["courseId"]);
        if (!$course) {
            return $this->json(["message" => "There is no course with that ID!"], 404);
        }
        $comment = new Comment();
        $comment->setContent($data['content']);
        $comment->setStudent($this->getUser());
        $comment->setCourse($course);
        $this->entityManager->persist($comment);
        $this->entityManager->flush();
        return $this->json($comment, 200, [], ['groups' => ['main']]);
    }


    // Delete comment
    #[Route('/{commentId}/delete', name: 'delete_comment', methods: "DELETE")]
    #[OA\Delete(description: 'Deletes a comment')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted comment',
        content: new Model(type: Comment::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'comment')]
    public function deleteComment(CommentRepository $commentRepository, $commentId): Response
    {
        $comment = $commentRepository->find($commentId);
        if (!$comment) {
            return $this->json(["message" => "There is no comment with that ID"]);
        }
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized to delete a comment!"], 403);
        }
        //
        $commentStudentId = $comment->getStudent()->getId();
        $currentUserId = $this->getUser()->getId();
        if($commentStudentId != $currentUserId)
        {
            return $this->json(["message" => "That's not your comment and you are not authorized to delete it!"], 403);
        }
        $this->entityManager->remove($comment);
        $this->entityManager->flush();
        return $this->json(["message" => "The comment with ID $commentId has been deleted"], 200);
    }

    //  Edit comment by Student
    #[Route('/{commentId}/edit', name: 'edit_comment', methods: "PUT")]
    #[OA\Put(description: 'Edit a comment ')]
    #[OA\RequestBody(
        description: 'Edit a comment by Id',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'content', type:'string'),
                new OA\Property(property: 'courseId', type:'string'),
            ],
            example: ['content' => 'great work , thank you  ',
                'idCourse'=>'52']
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Returns the updated comment ',
        content: new Model(type: Comment::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'comment')]
    public function editComment(CommentRepository $commentRepository, $commentId,Request $request): JsonResponse
    {
        $comment = $commentRepository->find($commentId);
        if (!$comment) {
            return $this->json(["message" => "There is no comment with that ID"]);
        }
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized to edit a comment!"], 403);
        }
        $commentStudentId = $comment->getStudent()->getId();
        $currentUserId = $this->getUser()->getId();
        if($commentStudentId != $currentUserId){
            return $this->json(["message" => "That's not your comment and you are not authorized to edit it!"], 403);
        }

        // Get the request content as an array
        $content = json_decode($request->getContent(), true);
        $comment->setContent($content["content"]);
        $this->entityManager->persist($comment);
        $this->entityManager->flush();
        return $this->json($comment, 200, [], ['groups' => ['main']]);
    }

    // Comments lists by Student
    #[Route('/{studentId}/list', name: 'comment_list_by_student', methods: "GET")]
    #[OA\Response(
        response: 200,
        description: 'Returns list of  comments by the  Id student ',
        content: new Model(type: Comment::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'comment')]
    public function listCommentsByStudentId(UserRepository $userRepository, $studentId): Response
    {
        // Retrieve the student by their ID
        $student = $userRepository->find($studentId);

        // Check if the student exists
        if (!$student) {
            return $this->json(["message" => "There is no student with that ID!"], 404);
        }

        // Return the list of comments associated with the student
        return $this->json($student->getComments(), 200, [], ['groups' => ['main']]);
    }

}
