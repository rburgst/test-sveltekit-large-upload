# Sample sveltekit app showing file uploading problems

This repo shows a problem with sveltekit adapter-node that causes large file uploads to hang the server.

To reproduce

1. `pnpm install`
2. `pnpm build`
3. `pnpm serve`
4. open the browser at http://localhost:3000/
5. upload an image between 3 and 9 MB, e.g. https://unsplash.com/photos/3wZn6OsNBnM (large resolution)

### Expected

you should see log output in the console of the server stating that the file is being saved to `/tmp/upload.jpg`.

### Actual

console shows nothing and server just sits there hanging. The POST in the browser never completes.

