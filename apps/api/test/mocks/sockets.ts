import { Server } from "socket.io";

export const socketId = 'socket-id';

export const createMockConfigService = (
  overrides: Record<string, any> = {},
) => ({
  get: jest.fn((key: string) => {
    if (key in overrides) return overrides[key];
    if (key === 'FRONTEND_URL') return 'https://web.test';
    return null;
  }),
});

export const createMockSocketServer = () => {
  const mock = {
    emit: jest.fn(),
    except: jest.fn().mockReturnThis(),
    engine: { on: jest.fn() },
  };

  return {
    ...mock,
    __mock__: {
      engineOn: mock.engine.on,
    },
  } as unknown as Partial<Server> & {
    __mock__: { engineOn: jest.Mock };
  };
};
