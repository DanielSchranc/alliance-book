import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

const queryClient = new QueryClient();

const container = document.getElementById("root")! as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <>{"Alliance Book"}</>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
