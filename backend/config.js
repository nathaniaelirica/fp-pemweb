import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import admin from 'firebase-admin';

// isikan firebaseConfig disini
const firebaseConfig = {
  apiKey: "AIzaSyAl2FJtHkAZ_LVKFLpi50mRrsW8pPetYK0",
  authDomain: "fp-pemweb-ddd4a.firebaseapp.com",
  projectId: "fp-pemweb-ddd4a",
  storageBucket: "fp-pemweb-ddd4a.appspot.com",
  messagingSenderId: "938514468868",
  appId: "1:938514468868:web:67e04aba0ff08084f46551"
};

const serviceAccount = {
  type: "service_account",
  project_id: "fp-pemweb-ddd4a",
  private_key_id: "59f68f240d5546beaa0fce258f8cfce7ffe447fa",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIaXV01zS4okue\nwsgLwACfLUwKYXLil2vBs4+d8PaeLOIJwoYGD45ht1XUR6w3EvEsPCn4QF2CSzHx\nJjF2GE7V87JOrWp4oOiPIt5KzI21Y36mVHn5fEBOP2i0bJhIt6nqDufXXZD+kAaF\n6uELHYDGO6yUMYFR26YyW4GvxBlcxydy5+YvuzLQsm8fFCf9mTT88c0vqHlffn3i\n+dLJOphnnQsrJcvR1nwk+wohu1gdhyjajWv9CaDtqFWOLin9wgijy7p1twE2NAfJ\nLr3ny0ewufRk33Q0DJUO5h8P2XV1MELzIwmhKA7akIo5Bh39pzhOFKviSl6zUOXc\njzYlm9D9AgMBAAECggEABUIbFlM1K2j6sfIrXH+PpJ2EIruWz5Iofh8PdBXn6pOD\n5LypVoxe8Hpmcpjk0FcbY806Tqylp28AovKdFpuhqeRod77+DacvIt5H1c+TIkC3\niHar8ptLdqIcRauZvUKwXxdABvsJ/FvcB/R3Lhr6j3juWL8JxRONw0F6YBm1jqUR\nIh2KGq6AMWTc1ct+Css37F3HjjHY/Uh3Pe7bK5ZfMwm+m4icnKyDUiXkGtGY2Kpe\n6PdKbG0/qxytMyp1UxwCmiWYdHgBJTF/RJeBPq48fXUnDaM5VnomijBunOo3cFdl\nfddZnJMyOXCib2wcdZfGYNR7Y2uKFfplW3YTVjdAIwKBgQDtm597qPm4abTHiuDN\nSubVwRabzrPXBOMhNu7F/zdTKbFP9CUjP5X5nbmukslxGhcKQhyEUtiYKbeLiOZZ\n2qxJArd6csOENQYPhn3+sqSfJrhEndCDIaaU0kX3YqGw7RBBAbUxPRMnm6eGH4Zt\ncqonsgXuBxsFd7DvVH4GiWOpAwKBgQDX7MU4Pw3fW+QWZaBu+kT8qY0K0pDbWw9p\nHl5oW+jNLuRqG6Z9WnpGupZnvD++CD6H8+XxAwwsEiA8T1M0LLZb7it10n8fCBTQ\nkhPZ53AuDlcRZmTGYz4GJDag0E35AORBxwWPv5jqbSibR372fIMi1PNjuUA+4OKJ\nf3ErZfB9/wKBgQCsFVFj1fVFwgjTm5lEFUMo/DbLkOBekYONwqMbcsM2z7NDHKbo\n6FxN9BVOgbCy4Rpeq5LLotSLH2t2+ycZXG36UqVfYU6IqX5CMD2AARGI0hoSV9lz\nnyNuFPvnNt+zq31iF0KK7pi4ztp9IMfS7ICfTydMRIklZJIYQzEius4a0QKBgASC\nrKf9ITQOPlh9bPmEftZsUEbumRoL7+l5Oe2iJd3LYfgZdcPelPlPQn8OPqKgl3XN\nkXsUXje5dTTtT0aivHh1JDFE4WTrjUvCEWoW3JAJuqXhZq+COTR1ozJ+x3IxI5OA\nLcyP6wjSmOuNdch+V1rt6dumbgIiPnky0VFfwsNPAoGAUoAxDW+8ADZ5FKHEBZ7H\n5PpQYFIFP7Z5dVbe3lVMEFMDtVkFtvH9Ptra/AWWw7qty1ZgmF5OU3E+f0cBFMVi\niCY0Hi9Mmah9ast4d6CUkgzllkNwqs7TQ5JjkGEC21LzwXOFCHt655v70LIWlQDG\nBKAdcWBmgNgiuFSSbUMLF+I=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-qrubq@fp-pemweb-ddd4a.iam.gserviceaccount.com",
  client_id: "115108259741101507434",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qrubq%40fp-pemweb-ddd4a.iam.gserviceaccount.com"
};

const firebaseAdmin = admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL:"https://fp-pemweb-ddd4a.firebaseio.com",
})

export const adminAuth = firebaseAdmin.auth();
export const adminDb = firebaseAdmin.firestore();

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);