<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email!')]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username!')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['edit-profile', 'students-list', 'student-show', 'teacher-list', 'main'])]
    private ?int $id = null;

    #[Groups(['edit-profile', 'students-list', 'student-show', 'teacher-list','show-details' , 'main'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[Groups(['edit-profile', 'students-list', 'student-show', 'main'])]
    #[ORM\Column(length: 255, unique: true)]
    private ?string $username = null;

    /**
     * @var string[]
     */

    #[Groups('edit-profile')]
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\Length(min: '8', minMessage: "Your password must be at least 8 characters")]
    #[Assert\Regex(pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$^', message: "Your password must contain at least one lowercase, one uppercase, one number and one special character")]
    private ?string $password = null;


    #[Groups(['edit-profile', 'students-list', 'student-show', 'teacher-delete' , 'main'])]
    #[ORM\Column(length: 255)]
    private ?string $firstName = null;

    #[Groups(['edit-profile', 'students-list', 'student-show', 'teacher-delete', 'main'])]
    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

    #[Groups(['teacher-delete'])]
    #[ORM\OneToMany(mappedBy: 'teacher', targetEntity: Course::class)]
    private Collection $createdCourses;

    #[ORM\ManyToMany(targetEntity: Course::class, mappedBy: 'student')]
    #[ORM\JoinTable(name: 'course_student')]
    private Collection $subscribedCourses;

    #[Groups(['edit-profile', 'student-show' , 'teacher-show', 'main' ])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $picture = null;

    #[ORM\Column]
    private ?bool $isDeleted = false;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Comment::class)]
    private Collection $comments;

    public function __construct()
    {
        $this->createdCourses = new ArrayCollection();
        $this->subscribedCourses = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }




    /**
     * @return Collection<int, Course>
     */
    public function getCreatedCourses(): Collection
    {
        return $this->createdCourses;
    }

    public function addCreatedCourse(Course $createdCourse): self
    {
        if (!$this->createdCourses->contains($createdCourse)) {
            $this->createdCourses->add($createdCourse);
            $createdCourse->setTeacher($this);
        }

        return $this;
    }

    public function removeCreatedCourse(Course $createdCourse): self
    {
        if ($this->createdCourses->removeElement($createdCourse)) {
            // set the owning side to null (unless already changed)
            if ($createdCourse->getTeacher() === $this) {
                $createdCourse->setTeacher(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Course>
     */
    public function getSubscribedCourses(): Collection
    {
        return $this->subscribedCourses;
    }

    public function addSubscribedCourse(Course $subscribedCourse): self
    {
        if (!$this->subscribedCourses->contains($subscribedCourse)) {
            $this->subscribedCourses->add($subscribedCourse);
            $subscribedCourse->addStudent($this);
        }

        return $this;
    }

    public function removeSubscribedCourse(Course $subscribedCourse): self
    {
        if ($this->subscribedCourses->removeElement($subscribedCourse)) {
            $subscribedCourse->removeStudent($this);
        }

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getIsDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function setIsDeleted(bool $isDeleted): self
    {
        $this->isDeleted = $isDeleted;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setStudent($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getStudent() === $this) {
                $comment->setStudent(null);
            }
        }

        return $this;
    }
}
