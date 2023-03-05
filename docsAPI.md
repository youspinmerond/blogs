# API v1

## index

/

Returning basic "Hello, world!" from NextJS layout.

## verify

/verify/
GET
* JSON params
* * token: string
* * tokenCheck: string

**You must have the admin's permissions.**
Returning information about owner token.

## Posts

/posts/

### create

/posts/create/
POST
* JSON params
* * post: object
* * token: string

post Object: {
  title: string;
  body: string;
  rank: number;
};

Creating post.

### delete

/posts/delete
DELETE
* JSON params
* * token: string
* * id: number

**You might have the admin's permissions.**
Deleting post. Post can delete only owner( or user with ADMIN permissions ).

### read

/posts/read/?id=number
GET

Returning post information.

### getNew

/posts/getNew

returning newest posts.

## users

/users/

### create

/users/create
POST
* JSON params
* * user: Object

user Object {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

Creating and returning user with token. You must have **unique** *nickname* and *email*.

### login

/users/login
POST
* JSON params
* * email?: string
* * name?: string
* * password: string

If exist as minimum one of email or name and right password, returning token and user information.

### delete

DOESN'T EXIST. OVERSOON.

### index

/users/
GET
* JSON params
* * id: number

Returning user information.

## Comments

/comments/

### create

/comments/create
POST
* JSON params
* * comment: object
* * token: string

comment Object {
  body: string;
  PostId: number;
}

Creating comment under post. Anyway you need token.

### delete

/comments/delete
DELETE
* JSON params
* * comment: object
* * token: string

**You must have the admin's permissions.**
Deleting comment.

### read

/comments/read
GET
* JSON params
* * id: number

Returning whole comment information.