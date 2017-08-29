export class Issue {
    constructor(
        public title: string,
        public body: string,
        public userLogin: string,
        public assigneeLogin: string
        ) { }
}
