import createClient from "openapi-fetch";
import type { paths } from "@eventhub/contracts";

/**
 * Типізований клієнт API.
 *
 * createClient<paths> — тут і відбувається вся магія: з типу paths,
 * згенерованого зі специфікації, openapi-fetch виводить
 * дозволені шляхи, параметри запиту й типи відповідей.
 */
export const api = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
});
