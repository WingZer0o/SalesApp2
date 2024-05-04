import { Subject } from "rxjs";
type QueueItem = () => Promise<void>;

export class Typewriter {
  #queue: QueueItem[] = [];
  typingSpeed: number;
  loop: boolean;
  element: HTMLElement;
  deletingSpeed: number;
  scrollNotificationSubject: Subject<void>;

  constructor(
    element: HTMLElement,
    { loop = false, typingSpeed = 50, deletingSpeed = 50, parentScroll = null } = {},
  ) {
    this.element = element;
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.scrollNotificationSubject = new Subject<void>();
  }

  typeString(string: string) {
    this.#queue.push(() => {
      return new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
          this.element.append(string[i]);
          i++;
          if (i % 30 === 0) {
            this.scrollNotificationSubject.next();
          }
          if (i >= 255) {
            this.element.append(string.slice(i))
            clearInterval(interval);
            resolve();
          } else if (i >= string.length) {
            clearInterval(interval);
            resolve();
          }
        }, this.typingSpeed);
      });
    });
    return this;
  }
  
  async start() {
    for (let cb of this.#queue) {
      await cb();
    }
    return this;
  }
}
