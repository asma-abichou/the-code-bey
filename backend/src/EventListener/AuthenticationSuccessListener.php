<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $user = $event->getUser();
        $oldData = $event->getData();
        $token = $oldData["token"];
        $newData = [
            "id" => $user->getId(),
            "token" => $token
        ];
        $event->setData($newData);
    }
}