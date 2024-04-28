class UserFile{

    #uid;
    #pin;
    #filename;
    #filedata;
    #filesize;
    #dwtimes;
    #timestamp;

    static builder = class {
        #uid;
        #pin;
        #filename;
        #filedata;
        #filesize;
        #dwtimes;
        #timestamp;


        withuid(uid){
            this.#uid = uid;
            return this;
        }
        withpin(pin){
            this.#pin = pin;
            return this;
        }
        withfilename(filename){
            this.#filename = filename;
            return this;
        }
        withfiledata(filedata){
            this.#filedata = filedata;
            return this;
        }
        withfilesize(filesize){
            this.#filesize = filesize;
            return this;
        }
        withdwtimes(dwtimes){
            this.#dwtimes = dwtimes;
            return this;
        }
        withtimestamp(timestamp){
            this.#timestamp = timestamp;
            return this;
        }
        build(){
            const usefile = new UserFile(
                this.#uid, 
                this.#pin, 
                this.#filename, 
                this.#filedata, 
                this.#timestamp, 
                this.#dwtimes, 
                this.#filesize
            );
            return usefile;
        }
    }

    constructor(uid, pin, filename, filedata, timestamp, dwtimes, filesize){
        this.#uid = uid; 
        this.#pin  = pin;
        this.#filename = filename; 
        this.#filedata = filedata; 
        this.#timestamp = timestamp;
        this.#dwtimes = dwtimes;
        this.#filesize = filesize;
    }

    get uid(){
        return this.#uid;
    }
    get pin(){
        return this.#pin 
    }
    get filename(){
        return this.#filename;
    }
    get filedata(){
        return this.#filedata;
    }
    get dwtimes(){
        return this.#dwtimes; 
    }
    get filesize(){
        return this.#filesize;
    }

    toString() {
        return `MyClass {
            UID: ${this.#uid},
            PIN: ${this.#pin},
            Filename: ${this.#filename},
            Filedata: ${this.#filedata},
            Filesize: ${this.#filesize},
            Download Times: ${this.#dwtimes},
            Timestamp: ${this.#timestamp}
        }`;
    }

}

module.exports = UserFile;