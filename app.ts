import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//this way give u all the database query logs
// const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  // await prisma.user.deleteMany();

  //* in create you can use Select/include (include: eager loading)
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Aviv",
  //     email: "Aviv@gmail.com",
  //     age: 29,
  //     userPreference: {
  //       create: {
  //         emailUpdated: true,
  //       },
  //     },
  //   },
  //   //Eager loading
  //   // include: {
  //   //   userPreference: true,
  //   // },
  //   select: {
  //     name: true,
  //     userPreference: { select: { id: true } },
  //   },
  // });

  //* creating many users.
  // const user = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "Aviv",
  //       email: "Aviv@gmail.com",
  //       age: 29,
  //     },
  //     {
  //       name: "Bar",
  //       email: "Bar@gmail.com",
  //       age: 26,
  //     },
  //   ],
  // });

  // await prisma.user.createMany({
  //   data:[{name:"Moshe",email:"Moshe@gmail.com",age:30},{name:"Eyal",email:"eyal@gmail.com",age:29}]
  // })
  //* findUnique function - findind users only by unique keys

  // const user = await prisma.user.findUnique({
  //   //*where clause to find unique keys.
  //   // where: {
  //   //   email: "Aviv@gmail.com",
  //   // },

  //   //* where clause to search by uniquness (age and name)
  //   where: {
  //     age_name: {
  //       age: 29,
  //       name: "Aviv",
  //     },
  //   },
  // });

  //* findFirst is the same as findUnique but can search on all keys.

  // const user = await prisma.user.findFirst({
  //   where: {
  //     age: 29,
  //   },
  // });

  //* findMany is searching all the records that match the where clause;

  // const users = await prisma.user.findMany({
  // where: {
  //   email: {
  //     startsWith: "gmail.com",

  /**
   * * equals : 'same and where clause .. give me the records that match exactly the name.
   * * not : give me all the users that not match the name i specificed.
   * * in : give me all the users that match the names in the array i provide.
   * * notIn : give me all the users that not match the names in the array i provide
   * * ls : less then , give me all the users that the age is less then the number
   * *lse : less then equals , same as ls but include also the ages that equal the number
   * *gt : greater then , oposite of ls .. give me the ages that bigger then .
   * *gte : greater then equal , like gt but include also the ages that equals the    number
   * * contains : give me all the users that contain in the email the part of the string i provide.
   * * endsWith : give me all users that the email ends with that part of string.
   * * startWith give me all users that the email start with that part of string.
   *  */
  //   },
  // },
  //* if there multiple ages with same value distinct will bring the first record with that age,
  //* also you can combine with more attributes like [age,email]
  // distinct: ["age"],

  //*ordering the data by an attribute
  // orderBy: {
  //   age: "asc",
  // },
  // //* take: give me the first 2 records its find
  // take: 2,
  // //* skip 1 will skip the first record and bring me the next 2 records.
  // skip: 1

  // where: {
  /**
       * * AND -
       * * that will search query for both where clause email and name.
        AND: [
            {email:{startsWith:"Aviv"}},
            {name:"Aviv"}
            ]
      
       * */
  /**
       * * OR : That will search query but or email match or name match.
          OR: [
            {email:{startsWith:"Aviv"}},
            {name:"Aviv"}
            ]
      
       */
  /**
       * * NOT: That will search all the records that NOT match the parameters
          NOT: [
            {email:{startsWith:"Aviv"}},
            {name:"Aviv"}
            ]
       */
  /**
       * * QUERIES ON RELATIONSHIPS
       
        where:{
          writtenPosts:{
            **every : will check if every post has that attribute matched and bring them
            every:{
              title:"test"            
            }  
            **some : will check if some of the posts has that attribute matched and bring them 
            some:{
              title:"test"
            }
            **none : bring all the posts that not match at all the attribute.
          }
        }
       */
  //   },
  // });

  //! updating user

  // const userPreference = await prisma.userPreference.create({
  //   data: { emailUpdated: true },
  // });
  // const user = await prisma.user.update({
  //   where: { email: "Aviv@gmail.com" },
  //   data: {
  //     userPreference: {
  //*     connect : connection and relation object to the user in this case .
  //       connect: {
  //         id: "87906d91-7eb7-4f84-b9bd-c66e8cd960c3",
  //       },
  //*     disconnect : disconnection the relation object from the user in this case
  //*     if its one to many or many to many we need to specifiy and ID , but if its one to one relation
  //*     we can just specifiy disconnect:true
  //      disconnect:{
  //        id:"87906d91-7eb7-4f84-b9bd-c66e8cd960c3"
  //        }
  //     },
  //   },
  // });

  const user = await prisma.user.findFirst({
    where: { email: "Aviv@gmail.com" },
    include: {
      userPreference: true,
    },
  });
  console.log(user);

  // console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
