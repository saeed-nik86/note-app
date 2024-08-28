import mitt from 'mitt';

declare module 'mitt' {
    interface Emitter<T> {
        on: (event: string, handler: (arg: any) => void) => void;
        emit: (event: string, ...args: any[]) => void;
        off: (event: string, handler: (arg: any) => void) => void;
    }
}

export default mitt;
