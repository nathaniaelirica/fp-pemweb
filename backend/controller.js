import express from "express";
import bodyParser from "body-parser";
// ....
import { db, auth, adminAuth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, addDoc, deleteDoc, collection,  where, getDocs, query } from "firebase/firestore";
const port = 3001;

import cors from "cors";
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: "User created successfully" });
    this.$router.push({ path: `/home` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: "User logged in successfully" });
    // this.$router.push({path: `/dashboard`})
    console.log("sukseess");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//buat create user di register
// router.post("/users", (req, res) => {
//   try {
//     var nama = req.body.nama;
//     var email = req.body.email;
//     var password = req.body.password;

//     db.collection("users").add({
//       nama: nama,
//       email: email,
//       password: password
//     });

//     res.send({
//       status: true,
//       message: "Data berhasil disimpan",
//     });
//   } catch (error) {
//     res.send({
//       status: false,
//       message: "Data gagal disimpan",
//     });
//   }
// });

//buat get ussers biar masuk firestore
// router.get("/users", (req, res) => {
//   try {
//     db.collection("users")
//       .get()
//       .then((querySnapshot) => {
//         let users = [];
//         let id;
//         querySnapshot.forEach((doc) => {
//           id = doc.id;
//           users.push({ id, ...doc.data() });
//         });
//         res.send(users);
//       });
//   } catch (error) {
//     res.send(error);
//   }
// });

router.get("/dashboard", (req, res) => {
  try {
    db.collection("dashboards")
      .get()
      .then((querySnapshot) => {
        let dashboards = [];
        let id;
        querySnapshot.forEach((doc) => {
          id = doc.id;
          dashboards.push({ id, ...doc.data() });
        });
        res.send(dashboards);
      });
  } catch (error) {
    res.send(error);
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    var destination = req.body.destination;
    var link = req.body.link;
    // var password = req.body.password;
    await addDoc(collection(db,"dashboards"),{
      destination: destination,
      link: link,
    }).then(()=>{
      res.send({
        status: true,
        message: "Data berhasil disimpan",
      });
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: false,
      message: "Data gagal disimpan",
    });
  }
});

router.patch("/edit/:id", async (req, res) => {
  console.log(req.body, req.params)
  try {
    db.collection("dashboards")
      .doc(req.params.id)
      .update({
        destination: req.body.destination,
        link: req.body.link,
      })
      .then(() => {
        res.send({
          status: true,
          message: "Data berhasil diubah",
        });
      });
    // await updateDoc(doc(db, "dashboards", req.params.id, {
    //   destination: destination,
    //   link: link
    // }))
    // console.log("bisa woi");
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "Data gagal diubah",
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await deleteDoc(doc(db, "dashboards", req.params.id))
    console.log("test");
  } catch (error) {
    console.log(error)
    res.send({
      status: false,
      message: "Data gagal dihapus",
    });
  }
});

router.get("/dashboard/redirect/:link", async(req,res)=>{
  const {link} = req.params;
  try{
    let links = {};
    const q = query(collection(db,"dashboards"), where("link" , "==", link))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      links = doc.data()
    })
    res.send({
      message: "Success Redirect",
      links: links
    })
  }
  catch(err){
    console.log(err)
  }
})
export default router;
