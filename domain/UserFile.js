class UserFile{
    static builder = class {
        #uidb;
        #pinb;
        #filenameb;
        #filedatab;
        #filesizeb;
        #dwtimesb;
        #timestampb;


        withuid(uid){
            this.#uidb = uid;
            return this;
        }
        withpin(pin){
            this.#pinb = pin;
            return this;
        }
        withfilename(filename){
            this.#filenameb = filename;
            return this;
        }
        withfiledata(filedata){
            this.#filedatab = filedata;
            return this;
        }
        withfilesize(filesize){
            this.#filesizeb = filesize;
            return this;
        }
        withdwtimes(dwtimes){
            this.#dwtimesb = dwtimes;
            return this;
        }
        withtimestamp(timestamp){
            this.#timestampb = timestamp;
            return this;
        }
        build(){
            const usefile = new UserFile(
                this.#uidb, 
                this.#pinb, 
                this.#filenameb, 
                this.#filedatab, 
                this.#timestampb, 
                this.#dwtimesb, 
                this.#filesizeb
            );
            return usefile;
        }
    }

    constructor(uid, pin, filename, filedata, timestamp, dwtimes, filesize){
        this.uid = uid; 
        this.pin  = pin;
        this.filename = filename; 
        this.filedata = filedata; 
        this.timestamp = timestamp;
        this.dwtimes = dwtimes;
        this.filesize = filesize;
    }

    toString() {
        return `MyClass {
            UID: ${this.uid},
            PIN: ${this.pin},
            Filename: ${this.filename},
            Filesize: ${this.filesize},
            Download Times: ${this.dwtimes},
            Timestamp: ${this.timestamp}
        }`;
    }

}

module.exports = UserFile;