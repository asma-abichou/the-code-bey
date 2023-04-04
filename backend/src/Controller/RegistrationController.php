<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use DateTimeImmutable;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class RegistrationController extends AbstractController
{
    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly UserPasswordHasherInterface $userPasswordHasher,
        private readonly EntityManagerInterface $entityManager
    )
    {
    }

    #[Route('/register/student', name: 'register_student', methods: ['POST'])]
    public function registerStudent(Request $request): JsonResponse
    {
        $user = $this->createUser($request, ["ROLE_STUDENT"]); // ['error' => 'Passwords do not match']
        if(is_array($user))
        {
            return $this->json($user, 401);
        }
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json($user, 200);
    }

    #[Route('/register/teacher', name: 'register_teacher', methods: ['POST'])]
    public function registerTeacher(Request $request): JsonResponse
    {
        $user = $this->createUser($request, ["ROLE_TEACHER"]);
        if(is_array($user))
        {
            return $this->json($user, 401);
        }
        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json($user, 200);
    }


    public function createUser(Request $request, array $roles): array|User
    {
        $content = json_decode($request->getContent(), true );
        $email = $content["email"];
        $plainPassword = $content["password"];
        $confirmPassword = $content["confirmPassword"];
        $firstName = $content["firstName"];
        $lastName = $content["lastName"];
        $dateOfBirth = new DateTimeImmutable($content["dateOfBirth"]);

        // Validate that password and confirm password
        if ($plainPassword !== $confirmPassword) {
            return ['error' => 'Passwords do not match'];
        }
        $user = new User();
        $user->setEmail($email);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setDateOfBirth($dateOfBirth);
        $user->setRoles($roles);

        $user->setPassword($plainPassword);
        // Validate passwords (min characters 8 / alphanumeric)
        $arrayOfErrors = $this->passwordValidation($user); // array
        if(count($arrayOfErrors) > 0 )
        {
            return $arrayOfErrors;
        }
        $password = $this->userPasswordHasher->hashPassword($user, $plainPassword);
        $user->setPassword($password);
        return $user;
    }
    public function passwordValidation(User $user): array
    {
        $errors = $this->validator->validate($user);
        $output = [];
        if(count($errors) > 0)
        {
            $count = 0;
            foreach ($errors as $error)
            {
                $count++;
                $output["Error" . $count] = $error->getMessage();
            }

        }
        return $output;
    }


}
