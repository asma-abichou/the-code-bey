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
    /**
     * @throws \Exception
     */
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        // Get request Body and decode it from JSON to array
        $content = json_decode($request->getContent(), true);
        $email = $content["email"];
        $plainPassword = $content["password"];
        $confirmPassword = $content["confirmPassword"];
        $firstName = $content["firstName"];
        $lastName = $content["lastName"];
        $dateOfBirth = new DateTimeImmutable($content["dateOfBirth"]);

        // Validate that password and confirm password
        if ($plainPassword !== $confirmPassword) {
            return $this->json(['error' => 'Passwords do not match'], 401);
        }
        $passwordRules = [
            '/[A-Z]/',      // Requires at least one uppercase letter
            '/[a-z]/',      // Requires at least one lowercase letter
            '/[0-9]/',      // Requires at least one numeric digit
            '/[^\w\s]/',    // Requires at least one non-alphanumeric character
            '/^.{8,}$/s',   // Requires a minimum of 8 characters
        ];

        foreach ($passwordRules as $rule) {
            if (!preg_match($rule, $plainPassword)) {
                return $this->json(['error' => 'Password does not meet complex'], 400);
            }
        }

        $user = new User();
        $user->setEmail($email);
        $password = $userPasswordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($password);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setDateOfBirth($dateOfBirth);
        $user->setRoles(["ROLE_STUDENT" , "ROLE_TEACHER" ]);
        $entityManager->persist($user);
        $entityManager->flush();
        // do anything else you need here, like send an email
        return $this->json($user, 200);
    }
}
