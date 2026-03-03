1. fs (FILE SYSTEM)
-> What it does ?
    * Read file
    * Write file
    * Delete file
    * Create folders
-> When to use ?
  * Reading JSON config
  * Saving logs
  * Uploading file
  * Working with file storage


  2. HTTP
  -> What it does?
    * Create web servers
    * Handle requests and responses
  -> When To Use
    * Building basic backend
    * Learning how Express works internally.

3. PATH
-> What it does?
   * Handles files path safely across OS
-> Why use ?
   * path fixes campatibility.

 4. Streams
 -> handles to use large data into chuks instead of loading at once  
  * Video Streaming
  * large file Upload
  * large file read
  -> Without Streams
  all data read at once -> heavy
  -> With Streams
  data read in small chunks -> efficient

  5. Buffers
  -> Temporary memory storage for binary data 
  -> Node work with binary data internally.


6. crypto
-> What It Does , Used for:
        * Hashing passwords
        * Creating tokens
        * Encryption
        * Secure data handling 
        
        
==== Imagine building file upload API:

----------------------------
http → Handle request

fs → Save file

path → Define file location

streams → Upload large files

buffer → Handle binary file data

crypto → Hash file or secure token