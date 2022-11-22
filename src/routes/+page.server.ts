import type { Actions } from './$types';
import * as fs from 'fs';

async function saveBufferToFile(filename: string, file: File): Promise<void> {
	console.log("saving upload file", filename)
    const buffer = (file.stream()) as unknown as ReadableStream;

	const reader = buffer.getReader();
	const cont = true;
	while (cont) {
		const buf = await reader.read();
		if (!buf || !buf.value) {
			break;
		}
        console.log("   ... read", buf.value?.length, "bytes")

		await fs.promises.appendFile(filename, buf.value);
	}
	console.log('file save done', filename);
}

export const actions: Actions = {
  default: async (event) => {
    // TODO log the user in
    console.log("event", event)

    const form = await event.request.formData();
    const formFile = form.get("file") as Blob;

    console.log("got form", formFile)

    saveBufferToFile("/tmp/upload.jpg", formFile as File);

    return {success: true}
  }
};