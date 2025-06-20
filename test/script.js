async function generateMediaForReal(mediaType, prompt) {
    const response = await fetch('/generate-media', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: mediaType,
            prompt: prompt
        })
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return await response.json();
}