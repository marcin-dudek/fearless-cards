<script>
	import { Moon, Sun } from 'lucide-svelte';
	import '../app.css';
	import Login from './Login.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<div class="navbar bg-base-900">
		<div class="navbar-start">
			<a class="btn btn-ghost text-xl" href="/">GoW Teams</a>
		</div>
		<div class="navbar-center"></div>
		<div class="navbar-end">
			<Login />
			<label class="btn btn-ghost swap swap-rotate">
				<input type="checkbox" class="theme-controller" value="nord" />
				<Moon class="swap-on fill-current size-10" />
				<Sun class="swap-off fill-current size-10" />
			</label>
		</div>
	</div>

	<div class="max-md:w-full md:max-w-screen-xl mx-auto px-4 text-center flex-grow">
		<slot />
	</div>

	<footer class="text-center p-4 mt-8">
		<p>
			Copyright &copy; 2024 <a href="https://magickwings.com">Magick Wings</a>. All rights reserved.
		</p>
	</footer>
</div>
