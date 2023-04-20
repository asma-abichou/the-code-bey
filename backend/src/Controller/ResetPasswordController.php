<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;
use OpenApi\Attributes as OA;

#[Route('/api/reset-password')]
class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    public function __construct(
        private readonly ResetPasswordHelperInterface $resetPasswordHelper,
        private readonly EntityManagerInterface $entityManager,
        private readonly UserRepository $userRepository
    ) {
    }

    /**
     * Display & process form to request a password reset.
     */
    #[Route('', name: 'app_forgot_password_request', methods: ['POST'])]
    #[OA\Post(description: 'Identify user')]
    #[OA\RequestBody(
        description: 'Identify who the password reset is for',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'email', type:'string'),
            ],
            example: [
                'email' => 'asmaa123@gmail.com'
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'send the link to the email ',
        content: new Model(type: User::class, groups: ['main'])
    )]

    #[OA\Tag(name: 'Reset Password')]
    public function request(Request $request, MailerInterface $mailer): Response
    {
        $content = json_decode($request->getContent(), true);
        $email = $content["email"];
        //send the password reset email
        return $this->processSendingPasswordResetEmail($email, $mailer);
    }

    /**
     * Confirmation page after a user has requested a password reset.
     */
   #[Route('/check-email', name: 'app_check_email' , methods: ['GET'])]
   #[OA\Response(
       response: 200,
       description: 'checking the user  email after they submit the forgot password form',
       content: new Model(type: User::class)
   )]
   #[OA\Tag(name: 'Reset Password')]
    public function checkEmail(): Response
    {
        // Generate a fake token if the user does not exist or someone hit this page directly.
        // This prevents exposing whether or not a user was found with the given email address or not
        //get the password reset token from the session
        if (null === ($resetToken = $this->getTokenObjectFromSession())) {

            $resetToken = $this->resetPasswordHelper->generateFakeResetToken();
        }

        return $this->render('reset_password/check_email.html.twig', [
            'resetToken' => $resetToken,
        ]);
    }

    /**
     * Validates and process the reset URL that the user clicked in their email.
     */
    #[Route('/reset/{token}', name: 'app_reset_password' , methods: ['GET'] )]

    #[OA\Response(
        response: 200,
        description: 'checking the user  email after they submit the forgot password form',
        content: new Model(type: User::class)
    )]
    #[OA\Tag(name: 'Reset Password')]
    public function reset(Request $request, UserPasswordHasherInterface $passwordHasher, string $token = null): Response
    {
        //If a token is provided as a parameter, it is stored in the session
        if ($token) {
            // We store the token in session and remove it from the URL, to avoid the URL being
            // loaded in a browser and potentially leaking the token to 3rd party JavaScript.
            $this->storeTokenInSession($token);

           /* return $this->redirectToRoute('app_reset_password');*/
        }
       //If no token is found, the function redirects to Facebook.
        $token = $this->getTokenFromSession();
        if (null === $token) {
            return $this->redirect("https://www.facebook.com");
            /*throw $this->createNotFoundException('No reset password token found in the URL or in the session.');*/
        }

        try {
            //If a token is found, it is validated and the corresponding user is fetched
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return $this->redirect("https://www.facebook.com");
        }
        // The token is valid; allow the user to change their password.
        return $this->redirect("https://www.google.com");
    }



    #[Route('/change-password', name: 'app_change_password' , methods: ['POST'])]
    #[OA\RequestBody(
        description: 'The new password',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'plainPassword', type:'string'),
            ],
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Checks if an email address is associated with an account that can be used to reset a password',
        content: new Model(type: User::class)
    )]
    #[OA\Tag(name: 'Reset Password')]

    public function changePassword(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $content =  json_decode($request->getContent(), true);
        $password = $content["password"];
        $token = $this->getTokenFromSession();
        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return $this->json(["Reset password link has expired!", 401]);
        }
        // A password reset token should be used only once, remove it.
        $this->resetPasswordHelper->removeResetRequest($token);

        // Encode(hash) the plain password, and set it.
        $encodedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($encodedPassword);
        $this->entityManager->flush();

        // The session is cleaned up after the password has been changed.
        $this->cleanSessionAfterReset();
        return $this->json(["message" => "Your password has been changed successfully!"], 200);
    }


    private function processSendingPasswordResetEmail(string $emailFormData, MailerInterface $mailer)
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $emailFormData,
        ]);

        // Do not reveal whether a user account was found or not.
        if (!$user) {
            return $this->json(["message" => "user does not exist!"], 404);
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);
        } catch (ResetPasswordExceptionInterface $e) {
            // If you want to tell the user why a reset email was not sent, uncomment
            // the lines below and change the redirect to 'app_forgot_password_request'.
            // Caution: This may reveal if a user is registered or not.
            //
            // $this->addFlash('reset_password_error', sprintf(
            //     '%s - %s',
            //     ResetPasswordExceptionInterface::MESSAGE_PROBLEM_HANDLE,
            //     $e->getReason()
            // ));

            return $this->json(["message" => "There is an error generating the token!"], 500);
        }

        $email = (new TemplatedEmail())
            ->from(new Address('support@thecodebey.com', 'thecodebey'))
            ->to($user->getEmail())
            ->subject('Your password reset request')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context([
                'resetToken' => $resetToken,
            ])
        ;

        $mailer->send($email);

        // Store the token object in session for retrieval in check-email route.
        $this->setTokenObjectInSession($resetToken);

        return $this->json(["message" => "Reset password email sent successfully"], 200);
    }
}
