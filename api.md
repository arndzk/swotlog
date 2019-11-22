Description | Expect | Return | Notes
-|-|-|-
Update user data | [object](#update-user-data) | true/false | -
Return user details | userId | [object](#return-user-details) |  Return **all classes** on both arrays along with a flag true/false 
Posts | - | [array](#posts) | -

<h3 id="update-user-data">Update user data</h3>

```javascript
{
  firstName: string, 
  lastName: string, 
  subscribed: number[] // (ids of subscribed classes), 
  passed: number[] // (ids of passed classes) 
} 
```

<h3 id="return-user-details">Return user details</h3>

```javascript 
{ 
 subscribed: [{ 
  className: string, 
  classId: number, 
  status: boolean 
 }, ...], 
 passed: [ { 
  className: string, 
  classId: number, 
  status: boolean 
 }, ...]
}
```

<h3 id="posts">Posts</h3>


```javascript
[  
 {
  id: number, 
  owner: string, // (fullName of post owner), 
  timestamp,
  content: string,
  type: string, // class or group post,
  relatedTo: string, // class or group name,
  likes: number, // total number of likes,
  likedByCurrentUser: boolean,
  comments: [{
   id: number,
   owner: string,
   timestamp,
   content: string,
   ownedByCurrentUser: boolean,
   likes: number
  }, ...]
 }
]
```