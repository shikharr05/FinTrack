//Everything about JWT Authentication

so basicalyy JWT authentication is used jisse client ki information ham hide krke client to server and server to client send kr ske taaki information leak na hoske

so in jwt authentication ham token create krte hai and then token hi transfer hota hai from client to server and vice versa

ab agr hame aage match bhi krna hai to like kisi ka data mangana hai DB se to bhi ham us token ko hi verify krte hai wether the token is authentic or not and wether token expire to nhi hogya.

full control flow:

user sends credentials like email and pass... now server verifies and generates a JWT with minimal info like id and returns this token to client which it stores.
ab later on kbhi bhi hame data verify ya mangana hai to we just verify wether jo client ke paas token hai wo authentic hai and expired to nhi hai if all good then it returns payload of JWT...

ab now what is payload??

basically JWT is made up of three things Header, Payload, Signature....

header is nothing but it stores the algo and type like JWT in this case....

payload stores the info with which the JWT token was signed like id and time of creation and time of expiry.

and signature stores the info that was created after signing the token with the help of JWT_SECRET basically ye jwt.sign({id}, JWT_SECRET) ke time bnti hai and at the time of verification yhi verify hoti hai...basically important part of JWT. 


ab sign krne ke lie jwt.sign({id}, JWT_SECRET, {expiresIn: '1h'}) isse hamara payload bnta hai and signature bnta hia....

jwt.verify(token, JWT_SECRET) ye verify krta hai wether jo ab signature generate hua hai and jo token ka signature hai wo same hai ya nhi and agr same hai to it returns the payload of the token which helps in getting the id and later with id ham jo bhi data chahe wo nikal skte hai from DB!

more concepts... cors->frontend backend //bcrypt 
access.... refresh....


axios:
The main purpose of axios is to make HTTP requests to a server (API) from your app — whether frontend (React, Vue, Angular) or backend (Node.js).

But on top of just making requests, axios gives you extra features (over plain fetch) like:
Automatic JSON handling
Timeout support
Request/response interceptors (like adding tokens automatically)
Cancel requests
Progress tracking (uploads/downloads)


Request Interceptor:
config = the request object (URL, method, headers, body, etc.) that we’re about to send to the server.

But the server won’t just trust anyone making requests. It needs proof that this request is from a logged-in user.

That proof is the token (usually a JWT) which we stored on the client side (e.g., in localStorage after login).

So before the request leaves our app, we add the token into the Authorization header of config.

When the server receives the request, it checks that header → verifies the token → if valid, it knows who you are and processes the request.


Response Interceptor:
response interceptor runs when the server sends back the response or error...lets us handle the response gloabally and no need to repeat the handling with every axios fetch.

why we pass Promise.reject(error) in last:
“I’m not handling this error fully here, I’m just adding some global logic. After that, I’ll still pass the error back to whoever called the API so they can decide what to do.”
just like a doctor gave a global cure and the disease to me as he dont know me well just first time but i also have a doctor in my family so i show that disease to him also and then do whatever i want to do with that disease if anything

//complete flow of image uploading..
got it got it so mai pura flow batata hu tell me where i am wrong so first user upload the profile pic ab because of ProfilePhotoSelector this component our profile pic get the value and then due to if(profilepic) condition uploadImage is called...in uploadImage multipart post backend call is made to "/upload-image" where because of multer a middlewhere it stores in uploads folder. and response.data is returned from which we extract imageUrl and store it in our DB    



//complete flow of deleting income
firstly incomeList will get rendered coz of incomeList component where we passed our incomeData and onDelete function. incomeData which we get from our api call made in function fetchIncomeDetails. now with another component wrapped inside it it renders in form of transactionInfoCard and when we click the button of trash sign it calls onDelete which is mentioned in transactionInfoCard and once onDelete gets call id of the income is passed in IncomeList component to another onDelete function which makes setOpenDeleteAlert as true and in data stores the id of the income. now as in modal the value of isOpen is openDeleteAlert and openDeleteAlert is true now because of onDelete therefore a modal box comes asking the user whether he/she wants to delte this detail. and in DeleteAlert component when the user clicks the button delete onDelete is called which further calls DeleteIncome with the id of the detail and now in deleteIncome we delete the id using our api call made by axiosInstance and if it is success the detail gets deleted with a toast,success mesage otherwise the gives an error.... also after deleting again the fetching call is made so that latest income can be rendered