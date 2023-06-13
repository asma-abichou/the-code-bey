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
use OpenApi\Attributes as OA;
use Nelmio\ApiDocBundle\Annotation\Model;

#[Route('/api')]
class CategoryController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }


    #[Route('/category/list', name: 'list', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Returns the list of categories',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Category::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'Category')]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->json($categoryRepository->findAll(), 200, [], ['groups' => ['main']]);

    }


    #[Route('/category', name: 'create', methods: ['POST'])]
    #[OA\Post(description: 'Creates a new category')]
    #[OA\RequestBody(
        description: 'Creates new category',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'title', type:'string'),
            ],
            example: ['title' => 'Fullstack development']
        )
    )]
    #[OA\Response(
        response: 201,
        description: 'Returns the created category',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Category::class, groups: ['main']))
        )
    )]
    #[OA\Tag(name: 'Category')]
    public function createCategory(Request $request): Response
    {
        // Get the request content as an array
        $request = json_decode($request->getContent(), true);

        // Check if the title field is empty or null
        if (empty($request['title']) || is_null ($request['title'])) {
            return $this->json(['error' => 'Title field cannot be empty'], 400);
        }

        // Create a new ClassCategory object with the request data
        $category = new Category();
        $category->setTitle($request['title']);
        // Save the new category to the database
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return $this->json($category, 200,  [], ['groups' => ['main']]);
    }

    #[Route('/category/{id}', name: 'get_by_id', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Returns a category by Id',
        content: new Model(type: Category::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'Category')]
    public function getCategoryById(CategoryRepository $categoryRepository, $id,Request $request): Response
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(["message" => "There is no category with that ID"]);
        }
        return $this->json($category, 200, [], ['groups' => ['main']]);
    }


    #[Route('/category/{id}', name: 'update_by_id', methods: ['PUT'])]
    #[OA\Put(description: 'Update a category')]
    #[OA\RequestBody(
        description: 'Update a category by Id',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'title', type:'string'),
            ],
            example: ['title' => 'Fullstack development']
        )
    )]
     #[OA\Response(
         response: 200,
         description: 'Returns the updated category',
         content: new Model(type: Category::class, groups: ['main'])
     )]
    #[OA\Tag(name: 'Category')]
    public function updateCategoryById(CategoryRepository $categoryRepository, $id,Request $request): Response
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(["message" => "There is no category with that ID"]);
        }
        // Get the request content as an array
        $content = json_decode($request->getContent(), true);
        $category->setTitle($content["title"]);
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return $this->json($category, 200, [], ['groups' => ['main']]);
    }


    #[Route('/category/{id}', name: 'delete', methods: ['DELETE'])]
    #[OA\Delete(description: 'Deletes a category')]
    #[OA\Response(
        response: 200,
        description: 'Returns the deleted category',
        content: new Model(type: Category::class, groups: ['main'])
    )]
    #[OA\Tag(name: 'Category')]
    public function deleteCategory(CategoryRepository $categoryRepository, $id): Response
    {
        $category = $categoryRepository->find($id);
        if (!$category) {
            return $this->json(["message" => "There is no category with that ID"]);
        }
        // delete category with the remove function
        $this->entityManager->remove($category);
        $this->entityManager->flush();
        return $this->json($category, 200, [], ['groups' => ['main']]);

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
