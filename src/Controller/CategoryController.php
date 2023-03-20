<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Course;
use App\Repository\CategoryRepository;
use App\Repository\CourseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class CategoryController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }
    #[Route('/category', name: 'list', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->json($categoryRepository->findAll(), 200, [], ['groups' => ['main']]);

    }


    #[Route('/category', name: 'create', methods: ['POST'])]
    public function createCategory(Request $request): Response
    {
        // Get the request content as an array
        $requestData = json_decode($request->getContent(), true);
        // Create a new ClassCategory object with the request data
        $category = new Category();
        $category->setTitle($requestData['title']);
        // Save the new category to the database
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return $this->json($category, 200,  [], ['groups' => ['main']]);
    }

    #[Route('/category/{id}', name: 'get_by_id', methods: ['GET'])]
    public function getCategoryById(CategoryRepository $categoryRepository, $id,Request $request): Response
    {
        $category = $categoryRepository->findBy(["des" => "symfon"]);

        if (!$category) {
            return $this->json(["message" => "There is no category with that ID"]);
        }

        return $this->json($category, 200, [], ['groups' => ['main']]);
    }



    #[Route('/category/{id}', name: 'update_by_id', methods: ['PUT'])]
    public function updateCategoryById(CategoryRepository $categoryRepository, $id,Request $request): Response
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(["message" => "There is no category with that ID"]);
        }
        $content = json_decode($request->getContent(), true);
        $category->setTitle($content["title"]);
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return $this->json($category, 200, [], ['groups' => ['main']]);
    }


    #[Route('/category/{id}', name: 'delete', methods: ['DELETE'])]
    public function deleteCategory(CategoryRepository $categoryRepository, $id): Response
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(["message" => "There is no category with that ID"]);
        }
        $this->entityManager->remove($category);
        $this->entityManager->flush();
        return new Response('The category with ID '.$id.' has been deleted');
    }
   /* public function calculateTotalHours(): int
    {
        $totalHours = 0;
        foreach ($this->$Hours as $course) {
            $totalHours += $course->getHours();
        }
        return $totalHours;
    }*/
}
