const fs = require("fs");
const path = require("path");

const {
  Document
} = require(
  "@langchain/core/documents"
);

const {
  RecursiveCharacterTextSplitter
} = require(
  "@langchain/textsplitters"
);

const {
  HuggingFaceTransformersEmbeddings
} = require(
  "@langchain/community/embeddings/hf_transformers"
);

const {
  FaissStore
} = require(
  "@langchain/community/vectorstores/faiss"
);


async function createVectorDB() {

  const folderPath =
    path.join(
      __dirname,
      "medicalData"
    );


  const files =
    fs.readdirSync(folderPath);


  const documents =
    files.map((file)=>{

      const content =
        fs.readFileSync(
          path.join(
            folderPath,
            file
          ),
          "utf8"
        );


      return new Document({
        pageContent:content,
        metadata:{
          source:file
        }
      });

    });


 const splitter =
 new RecursiveCharacterTextSplitter({
   chunkSize:500,
   chunkOverlap:50
 });


 const docs =
 await splitter.splitDocuments(
   documents
 );


 const embeddings =
 new HuggingFaceTransformersEmbeddings({
   model:
   "Xenova/all-MiniLM-L6-v2"
 });


 const vectorStore =
 await FaissStore.fromDocuments(
   docs,
   embeddings
 );


 await vectorStore.save(
   path.join(
     __dirname,
     "vectorStore"
   )
 );


 console.log(
 "✅ Medical RAG Vector Database Created"
 );


}


createVectorDB();