import { QueryClientProvider } from "@tanstack/react-query";
import { mockQueryClient } from "./mockQueryClient";

export const MockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={mockQueryClient}>
      {children}
      <div id="modal-root" />
    </QueryClientProvider>
  );
};
