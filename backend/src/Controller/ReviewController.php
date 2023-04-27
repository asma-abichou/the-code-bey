<?php

namespace App\Controller;


use App\Entity\Review;
use http\Env\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/course')]
class ReviewController extends AbstractController
{

    public function index(): Response
    {
        return $this->render('review/index.html.twig', [
            'controller_name' => 'ReviewController',
        ]);
    }


    #[Route('{courseId}/reviews', name: 'create_review' ,  methods: ['POST'])]

    public function createReview(Request $request, int $courseId)
    {
        if(!$this->isGranted("ROLE_STUDENT"))
        {
            return $this->json(["message" => "You are not a student and you are not authorized to write a comment !"], 403);
        }
        $request = json_decode($request->getContent(), true);
        $review = new Review();
        $review->setrating($request['rating']);
        $review->setComment($request['comment']);
        return $this->json($review, 200,  [], ['groups' => ['main']]);
    }
}
