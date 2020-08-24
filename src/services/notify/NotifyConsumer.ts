import { IMessage } from 'shared/types/models/notify';

abstract class NotifyConsumer {
  public abstract add(message: IMessage): void;
}

export default NotifyConsumer;
