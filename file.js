const fs=require('fs')
const ph=require('path')
module.exports = class File{
 	static async exists(path) {
		return new Promise((r, j) => {
			fs.exists(path,(exists)=>{
				r(exists)
			})
		})
	}
	static async mkdir(path) {
		return new Promise(async (r, j) => {
			if(!await this.exists(path)){
				fs.mkdir(path, (error) => {
					if (!error) {
						r(true)
					}else{
						r(false)
					}
				})
			}else{
				r(true)
			}
		})
	}
	static async readdir(path,filter=[]){
		return new Promise((r, j) => {
			fs.readdir(path,  (err, files)=>{
				if(filter.length){
					files = files.filter((v) => filter.includes(ph.extname(v).replace(/\./g,'')))
				}
				r(files)
			})
		})
	}
	static async createFile(file,content='',type='utf8'){
		return new Promise(async (r, j) => {
			if(!await this.exists(file)){
				fs.writeFile(file,content,type,(err)=>{
					r(!err)
				})
			}else{
				r(false)
			}
		})
	}
	static async newFile(file,content='',type='utf8',index=0){
		let res = await this.writeFile(file,content,type)
		let fileExtname = ph.extname(file)
		let reg = new RegExp('(\\'+fileExtname+')$')
		let fileName = ph.basename(file).replace(reg,'')
		let filePath = ph.dirname(file)
		if(!res){
			let fileNameList = fileName.split(' ')
			fileNameList.length>1&&fileNameList.pop()
			fileName = fileNameList.join('') +` ${index++}`+fileExtname
			return this.newFile(filePath+'/'+fileName,content,type,index)
		}else{
			return fileName
		}
	}
	static async readFile(file,type='utf8'){
		return new Promise(async (r, j) => {
			fs.readFile(file,type,(err,data)=>{
				r(data)
			})
		})
	}
	static async readJSON(file){
		try {
			return JSON.parse( await this.readFile(file))
		} catch (error) {
			return []
		}
	}
	static async writeFile(file,content='',type='utf8'){
		return new Promise(async (r, j) => {
			fs.writeFile(file,content,type,(err)=>{
				// console.log(err)
				r(!err)
			})
		})
	}
	static getFileName(file){
		return ph.basename(file)
	}
	static unlink(file){
		return new Promise((r, j) => {
			fs.unlink(file,(err)=>{
				r(!err)
			});
		})

	}
}
