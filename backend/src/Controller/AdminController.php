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

    #[Route('', name: 'list_student', methods: ['GET'])]
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
    }
}
