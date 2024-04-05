<script>
  import { BookText, Info, Moon, Sun } from 'lucide-svelte';
  import '../app.css';
  import Login from '../components/Login.svelte';

  import { user } from '$lib/user';
  export let data;
  $: user.set(data.user);
</script>

<div class="flex flex-col min-h-screen">
  <div class="navbar bg-base-200">
    <div class="navbar-start">
      <a class="btn btn-ghost text-2xl" href="/"><BookText class="size-10" />GoW Teams</a>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end">
      <div role="button" class="btn btn-ghost rounded avatar">
        <div class="size-10 rounded-full">
          <a href="/about"><Info class="size-10" /></a>
        </div>
      </div>
      <Login />
      <label class="btn btn-ghost swap swap-rotate">
        <input type="checkbox" class="theme-controller" value="nord" />
        <Moon class="swap-on fill-current size-10" />
        <Sun class="swap-off fill-current size-10" />
      </label>
    </div>
  </div>

  <div class="max-md:w-full md:max-w-screen-xl px-4 flex-grow">
    <slot />
  </div>

  <footer class="text-center p-4 mt-8">
    <p>
      Copyright &copy; 2024 <a href="https://magickwings.com">Magick Wings</a>. All rights reserved.
    </p>
  </footer>
</div>
