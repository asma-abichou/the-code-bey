<?php

namespace App\Controller;

use App\Repository\ContactUsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactUsController extends AbstractController
{
    #[Route('/list', name: 'contact_list', methods:"GET")]
    public function commentsList(ContactUsRepository $contactUsRepository): JsonResponse
    {
        return $this->json($contactUsRepository->findAll(), 200, [], ['groups' => ['main']]);
    }
}
