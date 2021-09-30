import path from 'path'
import fs from 'fs/promises'
import globby from 'globby'
import mkdirp from 'mkdirp'
import { CONTENT_FOLDER } from '../lib/constants'

const PUBLIC_FOLDER = 'public'

export default async function copyAssets() {
    const targetFiles = globby.sync(['**/*.*', '!**/*.md'], { cwd: CONTENT_FOLDER })
    console.log(`Copying ${targetFiles.length} static files from ${CONTENT_FOLDER} to ${PUBLIC_FOLDER}`)
    for (const file of targetFiles) {
        const publicFolder = path.join(process.cwd(), PUBLIC_FOLDER)
        const sourceFolder = path.join(process.cwd(), CONTENT_FOLDER)
        const dirName = path.dirname(file)
        await mkdirp(path.join(publicFolder, dirName))
        const sourcePath = path.join(sourceFolder, file)
        const destinationPath = path.join(publicFolder, file)
        await fs.copyFile(sourcePath, destinationPath)
    }
}

copyAssets()
