<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use DateTimeImmutable;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use OpenApi\Attributes as OA;


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

    #[Route('/register', name: 'register', methods: ['POST'])]
    #[OA\RequestBody(
        description: 'register a new user',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'username', type:'string'),
                new OA\Property(property: 'email', type:'string'),
                new OA\Property(property: 'password', type:'string'),
                new OA\Property(property: 'role', type:'string'),
                new OA\Property(property: 'firstName', type:'string'),
                new OA\Property(property: 'lastName', type:'string')
            ],
            example: [
                'username' => 'asma_student',
                'email' => 'asmaa123@gmail.com',
                'password' => 'AZ123456az#',
                'role' => 'student',
                'firstName' => 'asma',
                'lastName' => 'abichou',
                ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'return the new created user',
        content: new Model(type: User::class)
    )]
    #[OA\Tag(name: 'register')]
    public function register(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        if($content["role"] === "student")
        {
            $user = $this->createUser($request, ["ROLE_STUDENT"]);
        } elseif ($content["role"] === "teacher")
        {
            $user = $this->createUser($request, ["ROLE_TEACHER"]);
        }  elseif ($content["role"] === "admin")
        {
            $user = $this->createUser($request, ["ROLE_ADMIN"]);
        } else {
            return $this->json(["message" => "role is not correct!"], 400);
        }
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
        $firstName = $content["firstName"];
        $lastName = $content["lastName"];
        $email = $content["email"];
        $username = $content["username"];
        $plainPassword = $content["password"];
        $user = new User();
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setUsername($username);
        $user->setEmail($email);
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
