import { Machine } from "./Machine";
import { Queue } from "./Queue";

export type MachineInfo = {
    ID: number;
    fromQueues: number[];
    toQueue: number;
}

export type QueueInfo = {
    ID: number;
    isEndQueue: boolean;
}

export class Adapter {
    static toMachineInfo(m: Machine) {
        let fromIDs: number[] = [];
        m.prev.forEach((part) => {
            fromIDs.push(part.id);
        });
        let info: MachineInfo = {
            ID: m.id,
            fromQueues: fromIDs,
            toQueue: m.next[0].id
        };
        return info;
    }

    static toQueueInfo(q: Queue) {
        if (q.next.length == 0)
            q.isEndQueue = true;
        let info: QueueInfo = {
            ID: q.id,
            isEndQueue: q.isEndQueue
        };
        return info;
    }
}