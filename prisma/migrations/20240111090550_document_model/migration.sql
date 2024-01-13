-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "author" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
