import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersProvider } from "./contexts/UsersContext";
import { Home } from "./pages/Home/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <Home />
      </UsersProvider>
    </QueryClientProvider>
  )
}

export default App
