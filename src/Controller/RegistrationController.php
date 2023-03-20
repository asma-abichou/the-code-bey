<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use DateTimeImmutable;

#[Route('/api')]
class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        // Get request Body and decode it from JSON to array
        $content = json_decode($request->getContent(), true);
        $email = $content["email"];
        $plainPassword = $content["password"];
        $firstName = $content["firstName"];
        $lastName = $content["lastName"];
        $address = $content["address"];
        $dateOfBirth = new DateTimeImmutable($content["dateOfBirth"]);
        $user = new User();
        $user->setEmail($email);
        $password = $userPasswordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($password);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setAddress($address);
        $user->setDateOfBirth($dateOfBirth);
        $entityManager->persist($user);
        $entityManager->flush();
        // do anything else you need here, like send an email
        return $this->json($user, 200);
    }
}
